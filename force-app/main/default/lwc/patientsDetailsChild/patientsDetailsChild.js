import { LightningElement, api, track } from 'lwc';

export default class PatientsDetailsChild extends LightningElement {
    @api item = {};

    @track showProviderSearchResultCardDB = false;
    @track PernalDetail = false;
    @track specialties = false;
    @track insurancesDetails = false;

    @track medRequestPage = 1;
    @track medicationPage = 1;
    @track practitionerPage = 1;

    @track itemsPerPage = 5;

    get totalMedRequestPages() {
        return Math.ceil((this.item.medrequest || []).length / this.itemsPerPage);
    }

    get totalMedicationPages() {
        return Math.ceil((this.item.medication || []).length / this.itemsPerPage);
    }

    get totalPractitionerPages() {
        return Math.ceil((this.item.practitioner || []).length / this.itemsPerPage);
    }

    get currentMedRequests() {
        return this.paginate(this.item.medrequest || [], this.medRequestPage, this.itemsPerPage);
    }

    get currentMedications() {
        return this.paginate(this.item.medication || [], this.medicationPage, this.itemsPerPage);
    }

    get currentPractitioners() {
        return this.paginate(this.item.practitioner || [], this.practitionerPage, this.itemsPerPage);
    }

    handleShow() {
        this.showProviderSearchResultCardDB = !this.showProviderSearchResultCardDB;
    }

    handleShowOn() {
        this.PernalDetail = !this.PernalDetail;
    }

    handleShowTw() {
        this.specialties = !this.specialties;
    }

    handleShowThr() {
        this.insurancesDetails = !this.insurancesDetails;
    }

    prevPageMedRequest() {
        if (this.medRequestPage > 1) {
            this.medRequestPage--;
        }
    }

    nextPageMedRequest() {
        if (this.medRequestPage < this.totalMedRequestPages) {
            this.medRequestPage++;
        }
    }

    prevPageMedication() {
        if (this.medicationPage > 1) {
            this.medicationPage--;
        }
    }

    nextPageMedication() {
        if (this.medicationPage < this.totalMedicationPages) {
            this.medicationPage++;
        }
    }

    prevPagePractitioner() {
        if (this.practitionerPage > 1) {
            this.practitionerPage--;
        }
    }

    nextPagePractitioner() {
        if (this.practitionerPage < this.totalPractitionerPages) {
            this.practitionerPage++;
        }
    }

    paginate(items, page, pageSize) {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        return items.slice(start, end);
    }
}
