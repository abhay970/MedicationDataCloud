/**
* @Author      :   Mahadevaprasad R
* @description :   This class is used for the Insert and delete careObservation Data
* @TestClass   :   ObservationControllerTest
* @Date        :   17-07-2024
*/


public with sharing class ObservationController {
    
    
    public class Observation {
        public String observedSubjectId;
        public String deviceId;
        public String name;
        public Boolean hasMetExpectedValue;
        public String effectiveDateTime;
        public String issuedDateTime;
        public String observationStatus;
        public String sourceSystem;
        public String baselineUnitId;
        public String observedValueUnitId;
        public String codeId; 
        public String observedValueType;
        public String expectedValueId;
        public String methodId;
        public Integer numericValue;
    }
    
    
    public class ObservationData {
        public List<Observation> data;
    }
    
    // Wrapper class to hold insertion results and errors
    public class ProcessObservationsResult {
        @AuraEnabled
        public List<CareObservation> careObservations;
        @AuraEnabled
        public String errorMessage;
        
        public ProcessObservationsResult(List<CareObservation> careObservations, String errorMessage) {
            this.careObservations = careObservations;
            this.errorMessage = errorMessage;
        }
    }
    
    @AuraEnabled
    public static List<CareObservation> processObservations(String jsonString) {
        
        List<CareObservation> careObservationsToInsert = new List<CareObservation>();
        // Deserialize JSON string into ObservationData object
        ObservationData observations = (ObservationData) JSON.deserialize(jsonString, ObservationData.class);
        System.debug('observations><>'+observations);
        for (Observation obs : observations.data) {
            CareObservation careObs = new CareObservation();
            //////////string to datetime convertion
            String effectiveInput = obs.effectiveDateTime.replace('\'T\'', 'T').replace('\'Z\'', 'Z');
            // Parse the cleaned input datetime string to a DateTime object
            String effectiveInputdatePart = effectiveInput.substring(0, 10);
            String effectiveInputtimePart = effectiveInput.substring(11, 23);
            // Combine date and time into a single string
            String effectivecombinedDateTime = effectiveInputdatePart + ' ' + effectiveInputtimePart;
            // Parse the combined string to a DateTime object
            DateTime effectivedt = DateTime.valueOfGmt(effectivecombinedDateTime);
            System.debug('effectivedt><>'+effectivedt);                
            careObs.Name = obs.name;
            careObs.ObservedSubjectId = obs.observedSubjectId;
            careObs.CodeId = obs.codeId;
            careObs.ObservationStatus = obs.observationStatus;
            careObs.NumericValue = obs.numericValue;
            careObs.BaselineUnitId = obs.baselineUnitId;
            careObs.EffectiveDateTime = effectivedt;
            careObs.ExpectedValueId = obs.expectedValueId;
            careObs.MethodId = obs.methodId;
            careObs.IsMonitoredRemotely = true;
            careObs.HasMetExpectedValue = obs.hasMetExpectedValue;
            careObs.DeviceId = obs.deviceId;
            
            /* careObs.SourceSystem = obs.sourceSystem;
careObs.ObservedValueUnitId = obs.observedValueUnitId;

careObs.ObservedValueType = obs.observedValueType;
*/
            careObservationsToInsert.add(careObs);
            System.debug('careObservationsToInsert><>'+careObservationsToInsert);
        }
        
        System.debug('careObservationsToInsert><>'+careObservationsToInsert);
        //insert careObservationsToInsert;
        
        
        
        return careObservationsToInsert;
    }
    
    
    @AuraEnabled
    public static string deleteCareObservation(string patientId){
        // patientId='0017i00001ZwmgOAAR';
        System.debug('patientId><>>'+patientId);
        if(patientId!='0017i00001YuqBaAAJ'){
            
            
            list<CareObservation> care=[select id from CareObservation where ObservedSubjectId=:patientId And Id<>'0hI7i0000004DnMEAU'];
           // delete care;
        }
        return 'success';
    }
    @AuraEnabled
    public static string deleteAllCareObservation(){
        //patientId='0017i00001ZwmgOAAR';
        //System.debug('patientId><>>'+patientId);
        list<CareObservation> care=[select id from CareObservation where ObservedSubjectId='0017i00001ZwmgOAAR'];
        //delete care;
        return 'success';
    }
    @AuraEnabled
    public static string deleteObservedSubjectId(String AccID){
        // Query for CareObservation records where ObservedSubjectId matches AccID
        List<CareObservation> deleteCareObservation = [SELECT Id, ObservedSubjectId FROM CareObservation WHERE ObservedSubjectId = :AccID];
        
        String returnValue;
        
        // Check if there are any records to delete
        if (deleteCareObservation.size() > 0 && AccID!='0017i00001YuqBaAAJ') {
            // Delete the records
           // delete deleteCareObservation;
            returnValue = 'success';
        } else {
            // If no records found, still return success
            returnValue = 'success';
        }
        
        // Return the result
        return returnValue;
        
    }
    
    
}