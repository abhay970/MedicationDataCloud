public with sharing class DataCloudServiceMed {
    public static String queryDataCloudMed(String accessTokens) {
        // Define the endpoint and request parameters
        String endpoint = 'https://g-yt8ylfg02wmnddh04tkyjtmm.c360a.salesforce.com/api/v1/query';
        String accessToken = accessTokens;
        
        // Create the HTTP request
        HttpRequest req = new HttpRequest();
        req.setEndpoint(endpoint);
        req.setMethod('POST');
        req.setHeader('Authorization', 'Bearer ' + accessToken);
        req.setHeader('Content-Type', 'application/json');
        
        // Set the request body
        //String queryJson = '{"sql" : "SELECT RPM_CareObservation_BB824736__dlm.DeviceId__c,RPM_CareObservation_BB824736__dlm.Care_Program__c,RPM_CareObservation_BB824736__dlm.DataSource__c,RPM_CareObservation_BB824736__dlm.HasMetExpectedValue__c,RPM_CareObservation_BB824736__dlm.IssuedDateTime__c,RPM_CareObservation_BB824736__dlm.KQ_ObservedSubjectId__c,RPM_CareObservation_BB824736__dlm.Name__c,RPM_CareObservation_BB824736__dlm.NumericValue__c,RPM_CareObservation_BB824736__dlm.ObservationStatus__c,RPM_CareObservation_BB824736__dlm.ObservedSubjectId__c,RPM_CareObservation_BB824736__dlm.EffectiveDateTime__c,RPM_CareObservation_BB824736__dlm.SourceSystem__c,RPM_CareObservation_BB824736__dlm.ObservedValueUnitId__c,RPM_CareObservation_BB824736__dlm.codeId__c,RPM_CareObservation_BB824736__dlm.ObservedValueType__c FROM RPM_CareObservation_BB824736__dlm"}';
        //String queryJson= '{"sql" : "SELECT EpicMedication_Epic_MedicationR_ED6B1B2D__dll.display__c, EpicMedication_Epic_MedicationR_ED6B1B2D__dll.DataSourceObject__c, EpicMedication_Epic_MedicationR_ED6B1B2D__dll.Medication_Id__c, EpicMedication_Epic_MedicationR_ED6B1B2D__dll.DataSource__c, EpicMedication_Epic_MedicationR_ED6B1B2D__dll.Epic_MedicationRequesId__c, EpicMedication_Epic_MedicationR_ED6B1B2D__dll.id__c FROM EpicMedication_Epic_MedicationR_ED6B1B2D__dll"}';
        String queryJson= '{"sql" : "SELECT EpicMedication_Epic_MedicationR_ED6B1B2C__dll.DataSource__c,EpicMedication_Epic_MedicationR_ED6B1B2C__dll.DataSourceObject__c, EpicMedication_Epic_MedicationR_ED6B1B2C__dll.Practitioner_Id__c, EpicMedication_Epic_MedicationR_ED6B1B2C__dll.display__c, EpicMedication_Epic_MedicationR_ED6B1B2C__dll.Epic_MedicationRequestId__c, EpicMedication_Epic_MedicationR_ED6B1B2C__dll.Id__c, EpicMedication_Epic_MedicationR_ED6B1B2C__dll.Practitioner_Type__c FROM EpicMedication_Epic_MedicationR_ED6B1B2C__dll"}';
        // String queryJson= '{"sql" : "SELECT HCDC_MedicationRequest_EAA27AF2__dll.DataSourceObject__c, HCDC_MedicationRequest_EAA27AF2__dll.DataSource__c, HCDC_MedicationRequest_EAA27AF2__dll.authoredOn__c, HCDC_MedicationRequest_EAA27AF2__dll.category__c, HCDC_MedicationRequest_EAA27AF2__dll.codeSet__c, HCDC_MedicationRequest_EAA27AF2__dll.courseOfTherapyType__c,HCDC_MedicationRequest_EAA27AF2__dll.id__c, HCDC_MedicationRequest_EAA27AF2__dll.identifier__c, HCDC_MedicationRequest_EAA27AF2__dll.intent__c, HCDC_MedicationRequest_EAA27AF2__dll.medication__c,HCDC_MedicationRequest_EAA27AF2__dll.PatientId__c, HCDC_MedicationRequest_EAA27AF2__dll.Practitioner__c, HCDC_MedicationRequest_EAA27AF2__dll.reportedBoolean__c, HCDC_MedicationRequest_EAA27AF2__dll.status__c FROM HCDC_MedicationRequest_EAA27AF2__dll"}';
        req.setBody(queryJson);
        // Debug statements
        System.debug('Endpoint: ' + endpoint);
        System.debug('Authorization Header: Bearer ' + accessToken);
        System.debug('Request Body: ' + queryJson);
        
        // Create the HTTP response
        Http http = new Http();
        HTTPResponse res = http.send(req);
        
        // Process the response
        if (res.getStatusCode() == 200) {
            // Successful response
            String responseBody = res.getBody();
            System.debug('Response::::::::>> ' + responseBody);
            
            // Parse the response JSON if necessary
            Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(responseBody);
            // Handle the response as needed
            return responseBody;
        } else {
            // Error response
            System.debug('Error: ' + res.getStatusCode() + ' ' + res.getStatus());
            System.debug('Error Body: ' + res.getBody());
            return null;
        }
    }
}