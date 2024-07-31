import { LightningElement } from 'lwc';
// import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { loadScript } from 'lightning/platformResourceLoader';
import chartjs from '@salesforce/resourceUrl/ChartsJS';
// import parseAndDisplay from '@salesforce/apex/CustomCharts.parseAndDisplay';
import getDataForChart from '@salesforce/apex/DataForChart.getDataForChart';

export default class LineCharts extends LightningElement {
    chart;
    isChartInit = false;
    isChartVisible = false; 

    connectedCallback() {
        getDataForChart().then(res => {
            console.log('Data received: >>>>>>>>', JSON.stringify(res));
            this.processData(res.values);
        }).catch(err => {
            console.log('Error:', err);
            // this.showToast('Error', 'Error fetching observation data: ' + err.body.message, 'error');
        });
    }

    renderedCallback() {
        if (this.isChartInit) {
            return;
        }
        this.isChartInit = true;

        // Load Chart.js library
        Promise.all([loadScript(this, chartjs)])
            .then(() => {
                this.chartjs = window.Chart;
                this.initializeChart();
            })
            .catch(error => {
                this.showToast('Error', 'Error loading Chart.js library: ' + error.message, 'error');
            });
    }

    initializeChart() {
        const ctx = this.template.querySelector('canvas.linechart').getContext('2d');
        this.chart = new this.chartjs(ctx, this.config);
    }

    processData(observations) {
        const labels = [];
        const values = [];

        observations.forEach(obs => {
            if (obs.effectiveDateTime && typeof obs.effectiveDateTime === 'string') {
                const effectiveDate = new Date(obs.effectiveDateTime).toLocaleDateString(); // Use local date format
                labels.push(effectiveDate);
                values.push(obs.numericValue);
            } else {
                console.warn('Missing or invalid effectiveDateTime:', obs);
            }
        });
        if (this.chart) {
            this.chart.data.labels = labels;
            this.chart.data.datasets[0].data = values;
            this.chart.update();
        } else {
            console.warn('Chart is not initialized yet.');
        }
    }

    toggleChart() {
        this.isChartVisible = !this.isChartVisible;
        const chartContainer = this.template.querySelector('.chart-container');
        if (this.isChartVisible) {
            chartContainer.classList.remove('slds-hide');
        } else {
            chartContainer.classList.add('slds-hide');
        }
    }

    config = {
        type: 'line', // Change the chart type to 'line'
        data: {
            labels: [], // Dates will be filled here
            datasets: [{
                label: 'Blood Pressure',
                data: [], // Values will be filled here
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(120, 131, 246)',
                fill: false, // No fill for line chart
                tension: 0.1 // Line tension for smoother lines
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day',
                        tooltipFormat: 'll',  
                    },
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Value'
                    }
                }
            }
        }
    };

    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: title,
                message: message,
                variant: variant
            })
        );
    }
}