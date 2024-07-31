import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getAccessToken from '@salesforce/apex/OAuthExample.getAccessToken';


export default class PatientsDetails extends LightningElement {
    @track nameValue = '';
    @track providerData = [];
    showMain = true;
    showResult = false;
    inputDataForApex = {};

    handleName(event) {
        this.nameValue = event.target.value;
        this.inputDataForApex.Name = this.nameValue;
        console.log('Name:', this.nameValue);
    }

    handleSearchDeB() {
        console.log('handleSearchDeB - start',this.nameValue);
        getAccessToken({input:this.nameValue})
            .then(result => {
                console.log('handleSearchDeB result:', result);
                this.providerData = result;
                this.showMain = false;
                this.showResult = true;
            })
            .catch(error => {
                console.error('handleSearchDeB error:', error);
                this.showToast('Error', error.message, 'error');
                this.showMain = true;
                this.showResult = false;
            });
    }

    handleBackDB() {
        this.showMain = true;
        this.showResult = false;
        console.log('Back to search page. showMain:', this.showMain, ', showResult:', this.showResult);
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(event);
    }
}
