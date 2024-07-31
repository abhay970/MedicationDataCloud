import { LightningElement, api } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import ChartJs from '@salesforce/resourceUrl/ChartJs';
// import { loadScript } from 'lightning/platformResourceLoader';
// import ChartJs from '@salesforce/resourceUrl/ChartJs';

export default class LineChartsChild extends LightningElement {
    @api readingtype = 'Sample Reading';
    sectionClass = 'slds-section slds-is-close';
    chart;
    isChartInitialized = false;

    // Updated dummy data for the chart
    dummyData = [
        { x: '2023-01-01', y: 10, tooltip: 'Value: 10' },
        { x: '2023-01-02', y: 20, tooltip: 'Value: 20' },
        { x: '2023-01-03', y: 30, tooltip: 'Value: 30' },
        { x: '2023-01-04', y: 40, tooltip: 'Value: 40' },
        { x: '2023-01-05', y: 35, tooltip: 'Value: 35' }
    ];

    renderedCallback() {
        if (this.isChartInitialized) {
            return;
        }
        this.isChartInitialized = true;  
        this.loadChartJs();  
    }

    loadChartJs() {
        loadScript(this, ChartJs)
            .then(() => {
                this.generateChart(); // Generate chart after loading
                console.log('>>>>  ',this.generateChart());
              
            })
            .catch(error => {
                console.error("Error loading ChartJs", error);
            });
    }

    generateChart() {
        const ctx = this.template.querySelector('canvas.lineChart').getContext('2d');
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: this.readingtype,
                    data: this.dummyData,
                    fill: false,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 1,
                }],
            },
            options: {
                responsive: true,
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'day',
                            displayFormats: {
                                day: 'YYYY MMM D',
                            },
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Date'
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            min: 0,
                            max: 100,
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Value'
                        }
                    }]
                },
                tooltips: {
                    callbacks: {
                        label: (tooltipItem) => {
                            return tooltipItem.yLabel;
                        }
                    }
                }
            }
        });
    }

    toggleSection() {
        this.sectionClass = this.sectionClass === 'slds-section slds-is-open'
            ? 'slds-section slds-is-close'
            : 'slds-section slds-is-open';

        // Toggle icon based on section state
        this.iconName = this.sectionClass === 'slds-section slds-is-open' 
            ? 'utility:chevrondown' 
            : 'utility:chevronright';

        // Trigger chart generation on section open
        if (this.sectionClass === 'slds-section slds-is-open' && !this.isChartInitialized) {
            this.loadChartJs();
        }
    }
}
