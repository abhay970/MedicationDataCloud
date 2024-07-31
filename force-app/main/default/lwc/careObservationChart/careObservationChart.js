import { LightningElement,wire,track } from 'lwc';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';
import processObservations from "@salesforce/apex/ObservationController.processObservations";
import deleteCareObservation from "@salesforce/apex/ObservationController.deleteCareObservation";
import deleteAllCareObservation from "@salesforce/apex/ObservationController.deleteAllCareObservation";
import deleteObservedSubjectId from "@salesforce/apex/ObservationController.deleteObservedSubjectId";
export default class CareObservationChart extends LightningElement {


    CurrentPageReference;

    requestId;
@track Spinner=false;
    @wire(CurrentPageReference)
    setPageReference(currentPageReference) {
        this.currentPageReference = currentPageReference;
        if (this.currentPageReference) {
            console.log('Current Page Reference ID:', JSON.stringify(this.currentPageReference.attributes.recordId));
            this.requestId=this.currentPageReference.attributes.recordId;

          console.log('requestId><>:', this.requestId);
          if(this.requestId!==null && this.requestId!==''){
                    this.AccountID=this.requestId;
                    // alert(this.AccountID);
                 }
        }
    }

    pageRef;
    jsonData = {
        "data": [
            // {
            //     "name": "Blood Pressure",
            //     "observedSubjectId": "0017i00001ZwmgOAAR",
            //     "codeId": "0hs7i0000008DbUAAU",
            //     "DeviceId": "02i7i000007jzJCAAY",
            //     "observationStatus": "Final",
            //     "baselineUnitId": "0hE7i0000007Wv6EAE",
            //     "effectiveDateTime": "2024-05-11T08:53:24.000+0000",
            //     "expectedValueId": "0hL7i0000004CAfEAM",
            //     "methodId": "0iP7i000000Dkk5EAC",
            //     "hasMetExpectedValue": false,  
            //     "issuedDateTime": "2024-06-13T08:53:24.000+0000",
            //      "numericValue": 127 
            // },
            {
                "name": "Weight",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DalAAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuhEAE",
                "effectiveDateTime": "2024-05-11T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CABEA2",
                "methodId": "0iP7i000000DkjvEAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 98 
            },
            // {
            //     "name": "Heart Rate",
            //     "observedSubjectId": "0017i00001ZwmgOAAR",
            //     "codeId": "0hs7i0000008Db0AAE",
            //     "DeviceId": "02i7i000007jzJCAAY",
            //     "observationStatus": "Final",
            //     "baselineUnitId": "0hE7i0000007WuwEAE",
            //     "effectiveDateTime": "2024-05-11T08:53:24.000+0000",
            //     "expectedValueId": "0hL7i0000004CAVEA2",
            //     "methodId": "0iP7i000000DkkAEAS",
            //     "hasMetExpectedValue": false,  
            //     "issuedDateTime": "2024-06-13T08:53:24.000+0000",
            //      "numericValue": 87 
          //  }, 
            // {
            //     "name": "Blood Pressure",
            //     "observedSubjectId": "0017i00001ZwmgOAAR",
            //     "codeId": "0hs7i0000008DbUAAU",
            //     "DeviceId": "02i7i000007jzJCAAY",
            //     "observationStatus": "Final",
            //     "baselineUnitId": "0hE7i0000007Wv6EAE",
            //     "effectiveDateTime": "2024-05-12T08:53:24.000+0000",
            //     "expectedValueId": "0hL7i0000004CAfEAM",
            //     "methodId": "0iP7i000000Dkk5EAC",
            //     "hasMetExpectedValue": false,  
            //     "issuedDateTime": "2024-06-13T08:53:24.000+0000",
            //      "numericValue": 127 
            // },
            {
                "name": "Weight",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DalAAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuhEAE",
                "effectiveDateTime": "2024-05-12T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CABEA2",
                "methodId": "0iP7i000000DkjvEAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 92 
            },
            // {
            //     "name": "Heart Rate",
            //     "observedSubjectId": "0017i00001ZwmgOAAR",
            //     "codeId": "0hs7i0000008Db0AAE",
            //     "DeviceId": "02i7i000007jzJCAAY",
            //     "observationStatus": "Final",
            //     "baselineUnitId": "0hE7i0000007WuwEAE",
            //     "effectiveDateTime": "2024-05-12T08:53:24.000+0000",
            //     "expectedValueId": "0hL7i0000004CAVEA2",
            //     "methodId": "0iP7i000000DkkAEAS",
            //     "hasMetExpectedValue": false,  
            //     "issuedDateTime": "2024-06-13T08:53:24.000+0000",
            //      "numericValue": 66 
            // }, 
            // {
            //     "name": "Blood Pressure",
            //     "observedSubjectId": "0017i00001ZwmgOAAR",
            //     "codeId": "0hs7i0000008DbUAAU",
            //     "DeviceId": "02i7i000007jzJCAAY",
            //     "observationStatus": "Final",
            //     "baselineUnitId": "0hE7i0000007Wv6EAE",
            //     "effectiveDateTime": "2024-05-13T08:53:24.000+0000",
            //     "expectedValueId": "0hL7i0000004CAfEAM",
            //     "methodId": "0iP7i000000Dkk5EAC",
            //     "hasMetExpectedValue": false,  
            //     "issuedDateTime": "2024-06-13T08:53:24.000+0000",
            //      "numericValue": 141 
            // },
            {
                "name": "Weight",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DalAAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuhEAE",
                "effectiveDateTime": "2024-05-13T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CABEA2",
                "methodId": "0iP7i000000DkjvEAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 113 
            },
            // {
            //     "name": "Heart Rate",
            //     "observedSubjectId": "0017i00001ZwmgOAAR",
            //     "codeId": "0hs7i0000008Db0AAE",
            //     "DeviceId": "02i7i000007jzJCAAY",
            //     "observationStatus": "Final",
            //     "baselineUnitId": "0hE7i0000007WuwEAE",
            //     "effectiveDateTime": "2024-05-13T08:53:24.000+0000",
            //     "expectedValueId": "0hL7i0000004CAVEA2",
            //     "methodId": "0iP7i000000DkkAEAS",
            //     "hasMetExpectedValue": false,  
            //     "issuedDateTime": "2024-06-13T08:53:24.000+0000",
            //      "numericValue": 89 
            // }, 
            {
                "name": "Blood Pressure",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DbUAAU",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007Wv6EAE",
                "effectiveDateTime": "2024-05-14T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CAfEAM",
                "methodId": "0iP7i000000Dkk5EAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 120 
            },
            {
                "name": "Weight",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DalAAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuhEAE",
                "effectiveDateTime": "2024-05-14T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CABEA2",
                "methodId": "0iP7i000000DkjvEAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 90 
            },
            // {
            //     "name": "Heart Rate",
            //     "observedSubjectId": "0017i00001ZwmgOAAR",
            //     "codeId": "0hs7i0000008Db0AAE",
            //     "DeviceId": "02i7i000007jzJCAAY",
            //     "observationStatus": "Final",
            //     "baselineUnitId": "0hE7i0000007WuwEAE",
            //     "effectiveDateTime": "2024-05-14T08:53:24.000+0000",
            //     "expectedValueId": "0hL7i0000004CAVEA2",
            //     "methodId": "0iP7i000000DkkAEAS",
            //     "hasMetExpectedValue": false,  
            //     "issuedDateTime": "2024-06-13T08:53:24.000+0000",
            //      "numericValue": 81 
            // },
             {
                "name": "Blood Pressure",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DbUAAU",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007Wv6EAE",
                "effectiveDateTime": "2024-05-15T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CAfEAM",
                "methodId": "0iP7i000000Dkk5EAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 117 
            },
            {
                "name": "Weight",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DalAAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuhEAE",
                "effectiveDateTime": "2024-05-15T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CABEA2",
                "methodId": "0iP7i000000DkjvEAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 93 
            },
            {
                "name": "Heart Rate",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008Db0AAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuwEAE",
                "effectiveDateTime": "2024-05-15T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CAVEA2",
                "methodId": "0iP7i000000DkkAEAS",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 83 
            }, {
                "name": "Blood Pressure",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DbUAAU",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007Wv6EAE",
                "effectiveDateTime": "2024-05-16T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CAfEAM",
                "methodId": "0iP7i000000Dkk5EAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 103 
            },
            {
                "name": "Weight",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DalAAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuhEAE",
                "effectiveDateTime": "2024-05-16T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CABEA2",
                "methodId": "0iP7i000000DkjvEAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 96 
            },
            {
                "name": "Heart Rate",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008Db0AAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuwEAE",
                "effectiveDateTime": "2024-05-16T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CAVEA2",
                "methodId": "0iP7i000000DkkAEAS",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 85 
            },
            //  {
            //     "name": "Blood Pressure",
            //     "observedSubjectId": "0017i00001ZwmgOAAR",
            //     "codeId": "0hs7i0000008DbUAAU",
            //     "DeviceId": "02i7i000007jzJCAAY",
            //     "observationStatus": "Final",
            //     "baselineUnitId": "0hE7i0000007Wv6EAE",
            //     "effectiveDateTime": "2024-05-17T08:53:24.000+0000",
            //     "expectedValueId": "0hL7i0000004CAfEAM",
            //     "methodId": "0iP7i000000Dkk5EAC",
            //     "hasMetExpectedValue": false,  
            //     "issuedDateTime": "2024-06-13T08:53:24.000+0000",
            //      "numericValue": 127 
            // },
            {
                "name": "Weight",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DalAAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuhEAE",
                "effectiveDateTime": "2024-05-17T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CABEA2",
                "methodId": "0iP7i000000DkjvEAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 97 
            },
            {
                "name": "Heart Rate",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008Db0AAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuwEAE",
                "effectiveDateTime": "2024-05-17T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CAVEA2",
                "methodId": "0iP7i000000DkkAEAS",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 99 
            }, {
                "name": "Blood Pressure",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DbUAAU",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007Wv6EAE",
                "effectiveDateTime": "2024-05-18T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CAfEAM",
                "methodId": "0iP7i000000Dkk5EAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 126 
            },
            {
                "name": "Weight",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DalAAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuhEAE",
                "effectiveDateTime": "2024-05-18T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CABEA2",
                "methodId": "0iP7i000000DkjvEAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 66 
            },
            {
                "name": "Heart Rate",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008Db0AAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuwEAE",
                "effectiveDateTime": "2024-05-18T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CAVEA2",
                "methodId": "0iP7i000000DkkAEAS",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 68 
            }, {
                "name": "Blood Pressure",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DbUAAU",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007Wv6EAE",
                "effectiveDateTime": "2024-05-19T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CAfEAM",
                "methodId": "0iP7i000000Dkk5EAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 77 
            },
            {
                "name": "Weight",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DalAAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuhEAE",
                "effectiveDateTime": "2024-05-18T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CABEA2",
                "methodId": "0iP7i000000DkjvEAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 76 
            },
            {
                "name": "Heart Rate",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008Db0AAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuwEAE",
                "effectiveDateTime": "2024-05-18T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CAVEA2",
                "methodId": "0iP7i000000DkkAEAS",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 75 
            }, 
            // {
            //     "name": "Blood Pressure",
            //     "observedSubjectId": "0017i00001ZwmgOAAR",
            //     "codeId": "0hs7i0000008DbUAAU",
            //     "DeviceId": "02i7i000007jzJCAAY",
            //     "observationStatus": "Final",
            //     "baselineUnitId": "0hE7i0000007Wv6EAE",
            //     "effectiveDateTime": "2024-05-19T08:53:24.000+0000",
            //     "expectedValueId": "0hL7i0000004CAfEAM",
            //     "methodId": "0iP7i000000Dkk5EAC",
            //     "hasMetExpectedValue": false,  
            //     "issuedDateTime": "2024-06-13T08:53:24.000+0000",
            //      "numericValue": 127 
            // },
            {
                "name": "Weight",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DalAAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuhEAE",
                "effectiveDateTime": "2024-05-19T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CABEA2",
                "methodId": "0iP7i000000DkjvEAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 96 
            },
            {
                "name": "Heart Rate",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008Db0AAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuwEAE",
                "effectiveDateTime": "2024-05-19T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CAVEA2",
                "methodId": "0iP7i000000DkkAEAS",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 80 
            }, {
                "name": "Blood Pressure",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DbUAAU",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007Wv6EAE",
                "effectiveDateTime": "2024-06-01T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CAfEAM",
                "methodId": "0iP7i000000Dkk5EAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 147 
            },
            {
                "name": "Weight",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DalAAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuhEAE",
                "effectiveDateTime": "2024-06-01T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CABEA2",
                "methodId": "0iP7i000000DkjvEAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 106 
            },
            // {
            //     "name": "Heart Rate",
            //     "observedSubjectId": "0017i00001ZwmgOAAR",
            //     "codeId": "0hs7i0000008Db0AAE",
            //     "DeviceId": "02i7i000007jzJCAAY",
            //     "observationStatus": "Final",
            //     "baselineUnitId": "0hE7i0000007WuwEAE",
            //     "effectiveDateTime": "2024-06-01T08:53:24.000+0000",
            //     "expectedValueId": "0hL7i0000004CAVEA2",
            //     "methodId": "0iP7i000000DkkAEAS",
            //     "hasMetExpectedValue": false,  
            //     "issuedDateTime": "2024-06-13T08:53:24.000+0000",
            //      "numericValue": 89 
            // },
            //  {
            //     "name": "Blood Pressure",
            //     "observedSubjectId": "0017i00001ZwmgOAAR",
            //     "codeId": "0hs7i0000008DbUAAU",
            //     "DeviceId": "02i7i000007jzJCAAY",
            //     "observationStatus": "Final",
            //     "baselineUnitId": "0hE7i0000007Wv6EAE",
            //     "effectiveDateTime": "2024-06-10T08:53:24.000+0000",
            //     "expectedValueId": "0hL7i0000004CAfEAM",
            //     "methodId": "0iP7i000000Dkk5EAC",
            //     "hasMetExpectedValue": false,  
            //     "issuedDateTime": "2024-06-13T08:53:24.000+0000",
            //      "numericValue": 127 
            // },
            {
                "name": "Weight",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DalAAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuhEAE",
                "effectiveDateTime": "2024-06-10T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CABEA2",
                "methodId": "0iP7i000000DkjvEAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 96 
            },
            {
                "name": "Heart Rate",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008Db0AAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuwEAE",
                "effectiveDateTime": "2024-06-10T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CAVEA2",
                "methodId": "0iP7i000000DkkAEAS",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 85 
            }, {
                "name": "Blood Pressure",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DbUAAU",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007Wv6EAE",
                "effectiveDateTime": "2024-06-11T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CAfEAM",
                "methodId": "0iP7i000000Dkk5EAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 121 
            },
            {
                "name": "Weight",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DalAAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuhEAE",
                "effectiveDateTime": "2024-06-11T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CABEA2",
                "methodId": "0iP7i000000DkjvEAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 92 
            },
            {
                "name": "Heart Rate",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008Db0AAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuwEAE",
                "effectiveDateTime": "2024-06-11T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CAVEA2",
                "methodId": "0iP7i000000DkkAEAS",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 82 
            }, {
                "name": "Blood Pressure",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DbUAAU",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007Wv6EAE",
                "effectiveDateTime": "2024-06-12T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CAfEAM",
                "methodId": "0iP7i000000Dkk5EAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 123 
            },
            {
                "name": "Weight",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DalAAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuhEAE",
                "effectiveDateTime": "2024-06-12T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CABEA2",
                "methodId": "0iP7i000000DkjvEAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 98 
            },
            {
                "name": "Heart Rate",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008Db0AAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuwEAE",
                "effectiveDateTime": "2024-06-12T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CAVEA2",
                "methodId": "0iP7i000000DkkAEAS",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 75 
            }, {
                "name": "Blood Pressure",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DbUAAU",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007Wv6EAE",
                "effectiveDateTime": "2024-06-13T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CAfEAM",
                "methodId": "0iP7i000000Dkk5EAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 107 
            },
            {
                "name": "Weight",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DalAAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuhEAE",
                "effectiveDateTime": "2024-06-13T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CABEA2",
                "methodId": "0iP7i000000DkjvEAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 86 
            },
            {
                "name": "Heart Rate",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008Db0AAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuwEAE",
                "effectiveDateTime": "2024-06-13T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CAVEA2",
                "methodId": "0iP7i000000DkkAEAS",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 84 
            }, {
                "name": "Blood Pressure",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DbUAAU",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007Wv6EAE",
                "effectiveDateTime": "2024-06-14T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CAfEAM",
                "methodId": "0iP7i000000Dkk5EAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 124 
            },
            {
                "name": "Weight",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DalAAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuhEAE",
                "effectiveDateTime": "2024-06-14T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CABEA2",
                "methodId": "0iP7i000000DkjvEAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 94
            },
            {
                "name": "Heart Rate",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008Db0AAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuwEAE",
                "effectiveDateTime": "2024-06-14T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CAVEA2",
                "methodId": "0iP7i000000DkkAEAS",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 104 
            }, {
                "name": "Blood Pressure",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DbUAAU",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007Wv6EAE",
                "effectiveDateTime": "2024-06-15T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CAfEAM",
                "methodId": "0iP7i000000Dkk5EAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 112 
            },
            {
                "name": "Weight",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DalAAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuhEAE",
                "effectiveDateTime": "2024-06-15T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CABEA2",
                "methodId": "0iP7i000000DkjvEAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 87 
            },
            {
                "name": "Heart Rate",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008Db0AAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuwEAE",
                "effectiveDateTime": "2024-06-15T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CAVEA2",
                "methodId": "0iP7i000000DkkAEAS",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 98 
            }, {
                "name": "Blood Pressure",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DbUAAU",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007Wv6EAE",
                "effectiveDateTime": "2024-06-16T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CAfEAM",
                "methodId": "0iP7i000000Dkk5EAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 117 
            },
            {
                "name": "Weight",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DalAAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuhEAE",
                "effectiveDateTime": "2024-06-16T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CABEA2",
                "methodId": "0iP7i000000DkjvEAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 97
            },
            {
                "name": "Heart Rate",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008Db0AAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuwEAE",
                "effectiveDateTime": "2024-06-16T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CAVEA2",
                "methodId": "0iP7i000000DkkAEAS",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 106
            },
            //  {
            //     "name": "Blood Pressure",
            //     "observedSubjectId": "0017i00001ZwmgOAAR",
            //     "codeId": "0hs7i0000008DbUAAU",
            //     "DeviceId": "02i7i000007jzJCAAY",
            //     "observationStatus": "Final",
            //     "baselineUnitId": "0hE7i0000007Wv6EAE",
            //     "effectiveDateTime": "2024-06-17T08:53:24.000+0000",
            //     "expectedValueId": "0hL7i0000004CAfEAM",
            //     "methodId": "0iP7i000000Dkk5EAC",
            //     "hasMetExpectedValue": false,  
            //     "issuedDateTime": "2024-06-13T08:53:24.000+0000",
            //      "numericValue": 127 
            // },
            {
                "name": "Weight",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DalAAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuhEAE",
                "effectiveDateTime": "2024-06-17T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CABEA2",
                "methodId": "0iP7i000000DkjvEAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 96 
            },
            {
                "name": "Heart Rate",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008Db0AAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuwEAE",
                "effectiveDateTime": "2024-06-17T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CAVEA2",
                "methodId": "0iP7i000000DkkAEAS",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 85 
            }, {
                "name": "Blood Pressure",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DbUAAU",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007Wv6EAE",
                "effectiveDateTime": "2024-06-18T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CAfEAM",
                "methodId": "0iP7i000000Dkk5EAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 92 
            },
            {
                "name": "Weight",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DalAAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuhEAE",
                "effectiveDateTime": "2024-06-18T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CABEA2",
                "methodId": "0iP7i000000DkjvEAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 65 
            },
            {
                "name": "Heart Rate",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008Db0AAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuwEAE",
                "effectiveDateTime": "2024-06-18T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CAVEA2",
                "methodId": "0iP7i000000DkkAEAS",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 115 
            },
            //  {
            //     "name": "Blood Pressure",
            //     "observedSubjectId": "0017i00001ZwmgOAAR",
            //     "codeId": "0hs7i0000008DbUAAU",
            //     "DeviceId": "02i7i000007jzJCAAY",
            //     "observationStatus": "Final",
            //     "baselineUnitId": "0hE7i0000007Wv6EAE",
            //     "effectiveDateTime": "2024-06-19T08:53:24.000+0000",
            //     "expectedValueId": "0hL7i0000004CAfEAM",
            //     "methodId": "0iP7i000000Dkk5EAC",
            //     "hasMetExpectedValue": false,  
            //     "issuedDateTime": "2024-06-13T08:53:24.000+0000",
            //      "numericValue": 127 
            // },
            {
                "name": "Weight",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DalAAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuhEAE",
                "effectiveDateTime": "2024-06-19T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CABEA2",
                "methodId": "0iP7i000000DkjvEAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 90 
            },
            {
                "name": "Heart Rate",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008Db0AAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuwEAE",
                "effectiveDateTime": "2024-06-19T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CAVEA2",
                "methodId": "0iP7i000000DkkAEAS",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 88 
            }, {
                "name": "Blood Pressure",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DbUAAU",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007Wv6EAE",
                "effectiveDateTime": "2024-06-21T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CAfEAM",
                "methodId": "0iP7i000000Dkk5EAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 80
            },
            {
                "name": "Weight",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DalAAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuhEAE",
                "effectiveDateTime": "2024-06-21T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CABEA2",
                "methodId": "0iP7i000000DkjvEAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 107 
            },
            {
                "name": "Heart Rate",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008Db0AAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuwEAE",
                "effectiveDateTime": "2024-06-21T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CAVEA2",
                "methodId": "0iP7i000000DkkAEAS",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 105 
            }, {
                "name": "Blood Pressure",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DbUAAU",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007Wv6EAE",
                "effectiveDateTime": "2024-07-11T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CAfEAM",
                "methodId": "0iP7i000000Dkk5EAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 138 
            },
            // {
            //     "name": "Weight",
            //     "observedSubjectId": "0017i00001ZwmgOAAR",
            //     "codeId": "0hs7i0000008DalAAE",
            //     "DeviceId": "02i7i000007jzJCAAY",
            //     "observationStatus": "Final",
            //     "baselineUnitId": "0hE7i0000007WuhEAE",
            //     "effectiveDateTime": "2024-07-11T08:53:24.000+0000",
            //     "expectedValueId": "0hL7i0000004CABEA2",
            //     "methodId": "0iP7i000000DkjvEAC",
            //     "hasMetExpectedValue": false,  
            //     "issuedDateTime": "2024-06-13T08:53:24.000+0000",
            //      "numericValue": 81 
            // },
            {
                "name": "Heart Rate",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008Db0AAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuwEAE",
                "effectiveDateTime": "2024-07-11T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CAVEA2",
                "methodId": "0iP7i000000DkkAEAS",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 62 
            }, {
                "name": "Blood Pressure",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DbUAAU",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007Wv6EAE",
                "effectiveDateTime": "2024-07-19T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CAfEAM",
                "methodId": "0iP7i000000Dkk5EAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 109 
            },
            {
                "name": "Weight",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DalAAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuhEAE",
                "effectiveDateTime": "2024-07-19T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CABEA2",
                "methodId": "0iP7i000000DkjvEAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 82 
            },
            {
                "name": "Heart Rate",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008Db0AAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuwEAE",
                "effectiveDateTime": "2024-07-19T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CAVEA2",
                "methodId": "0iP7i000000DkkAEAS",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 119 
            }, {
                "name": "Blood Pressure",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DbUAAU",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007Wv6EAE",
                "effectiveDateTime": "2024-07-17T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CAfEAM",
                "methodId": "0iP7i000000Dkk5EAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 148 
            },
            {
                "name": "Weight",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DalAAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuhEAE",
                "effectiveDateTime": "2024-07-17T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CABEA2",
                "methodId": "0iP7i000000DkjvEAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 100 
            },
            {
                "name": "Heart Rate",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008Db0AAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuwEAE",
                "effectiveDateTime": "2024-07-17T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CAVEA2",
                "methodId": "0iP7i000000DkkAEAS",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 74 
            }, {
                "name": "Blood Pressure",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008DbUAAU",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007Wv6EAE",
                "effectiveDateTime": "2024-05-25T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CAfEAM",
                "methodId": "0iP7i000000Dkk5EAC",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 112 
            },
            // {
            //     "name": "Weight",
            //     "observedSubjectId": "0017i00001ZwmgOAAR",
            //     "codeId": "0hs7i0000008DalAAE",
            //     "DeviceId": "02i7i000007jzJCAAY",
            //     "observationStatus": "Final",
            //     "baselineUnitId": "0hE7i0000007WuhEAE",
            //     "effectiveDateTime": "2024-05-25T08:53:24.000+0000",
            //     "expectedValueId": "0hL7i0000004CABEA2",
            //     "methodId": "0iP7i000000DkjvEAC",
            //     "hasMetExpectedValue": false,  
            //     "issuedDateTime": "2024-06-13T08:53:24.000+0000",
            //      "numericValue": 89
            // },
            {
                "name": "Heart Rate",
                "observedSubjectId": "0017i00001ZwmgOAAR",
                "codeId": "0hs7i0000008Db0AAE",
                "DeviceId": "02i7i000007jzJCAAY",
                "observationStatus": "Final",
                "baselineUnitId": "0hE7i0000007WuwEAE",
                "effectiveDateTime": "2024-05-25T08:53:24.000+0000",
                "expectedValueId": "0hL7i0000004CAVEA2",
                "methodId": "0iP7i000000DkkAEAS",
                "hasMetExpectedValue": false,  
                "issuedDateTime": "2024-06-13T08:53:24.000+0000",
                 "numericValue": 67 
            }
        ]
    };

connectedCallback(){
    alert();
    this.Spinner=true;
    let jsonString = JSON.stringify(this.jsonData);
    deleteObservedSubjectId({AccID: this.accId})
    .then(result => {
        // Handle result as needed
        console.log('Processed observations:',JSON.stringify( result));
        if(result=='success'){
          // Call Apex method
    processObservations({ jsonString: jsonString })
    .then(result => {
        // Handle result as needed
        //alert('Data inserted');
        console.log('Processed observations:',JSON.stringify(result));
        this.accId=result[0].ObservedSubjectId;
        console.log('accId<><>>>',JSON.stringify(this.accId));
        this.Spinner=false;
    })
    .catch(error => {
        // Handle error
        console.error('Error processing observations:', error);
    });
} 
    })
    .catch(error => {
        // Handle error
        console.error('Error processing observations:', error);
    });

   
    window.addEventListener('beforeunload', this.handleBeforeUnload);
    window.addEventListener('unload', this.handleUnload);
  
}

disconnectedCallback(){
//alert('Data Deleted');
   
    deleteCareObservation({ patientId: this.accId })
        .then(result => {
            // Handle result as needed
            console.log('Processed observations:',JSON.stringify( result));
        })
        .catch(error => {
            // Handle error
            console.error('Error processing observations:', error);
        });
      //  window.removeEventListener('beforeunload', this.handleBeforeUnload);
        window.removeEventListener('unload', this.handleUnload);
}

handleBeforeUnload(event) {
   
    deleteAllCareObservation({  })
        .then(result => {
            // Handle result as needed
            console.log('Processed observations:',JSON.stringify( result));
        })
        .catch(error => {
            // Handle error
            console.error('Error processing observations:', error);
        });
}

handleUnload(event) {
   
    navigator.sendBeacon('/your-server-endpoint', JSON.stringify({ message: 'Page is being closed' }));
    deleteCareObservation({ patientId: this.accId })
        .then(result => {
            // Handle result as needed
            console.log('Processed observations:',JSON.stringify( result));
        })
        .catch(error => {
            // Handle error
            console.error('Error processing observations:', error);
        });
}

}