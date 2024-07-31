public class MedicationWrapperDC {
    public static void parseAndDisplay() {
        // JSON string
        String jsonString = '{"data":[{"display__c":"Nurse Obstetrics, RN","DataSourceObject__c":"EpicMedication_Epic_MedicationRequest_Medication_ED6B1B2D","Medication_Id__c":"_en0IpPR7jJ9u2aTvV-F20Tj7oIUehIqKfygWYu5Tt9l2GpPo3ZYvVCUT5TKmWwCU63","DataSource__c":"EpicMedication_5601b1bc_c036_4dce_9680_a559c8bddcad","id__c":"en0IpPR7jJ9u2aTvV-F20Tj7oIUehIqKfygWYu5Tt9l2GpPo3ZYvVCUT5TKmWwCU63"},{"display__c":"Physician Obstetrics, MD","DataSourceObject__c":"EpicMedication_Epic_MedicationRequest_Medication_ED6B1B2D","Medication_Id__c":"_e0Ew1aWmg6Y6qNCaOcI7KrbLwuOv1alZn5-InWqC4RQCerkX-9.LpqaKJagAzmpnH3","DataSource__c":"EpicMedication_5601b1bc_c036_4dce_9680_a559c8bddcad","id__c":"e0Ew1aWmg6Y6qNCaOcI7KrbLwuOv1alZn5-InWqC4RQCerkX-9.LpqaKJagAzmpnH3"}],"startTime":"2024-07-29T10:12:53.348018Z","endTime":"2024-07-29T10:12:53.633034Z","rowCount":2,"queryId":"20240729_055947_01952_uauus","done":true,"metadata":{"DataSource__c":{"type":"VARCHAR","placeInOrder":3,"typeCode":12},"DataSourceObject__c":{"type":"VARCHAR","placeInOrder":1,"typeCode":12},"display__c":{"type":"VARCHAR","placeInOrder":0,"typeCode":12},"Medication_Id__c":{"type":"VARCHAR","placeInOrder":2,"typeCode":12},"Epic_MedicationRequesId__c":{"type":"VARCHAR","placeInOrder":4,"typeCode":12},"id__c":{"type":"VARCHAR","placeInOrder":5,"typeCode":12}}}';
        Map<String, Object> resultMap = (Map<String, Object>) JSON.deserializeUntyped(jsonString);
        List<Object> dataList = (List<Object>) resultMap.get('data');
        for (Object dataObj : dataList) {
            Map<String, Object> dataMap = (Map<String, Object>) dataObj;
            System.debug('Display: ' + (String) dataMap.get('display__c'));
            System.debug('DataSourceObject: ' + (String) dataMap.get('DataSourceObject__c'));
            System.debug('Medication_Id: ' + (String) dataMap.get('Medication_Id__c'));
            System.debug('DataSource: ' + (String) dataMap.get('DataSource__c'));
            System.debug('ID: ' + (String) dataMap.get('id__c'));
        }
        Integer rowCount = ((Decimal) resultMap.get('rowCount')).intValue(); // Cast to Decimal first, then to Integer
        String queryId = (String) resultMap.get('queryId');
        Boolean done = (Boolean) resultMap.get('done');
        Map<String, Object> metadataMap = (Map<String, Object>) resultMap.get('metadata');
        
        // System.debug('Start Time: ' + startTime);
        // System.debug('End Time: ' + endTime);
        System.debug('Row Count: ' + rowCount);
        System.debug('Query ID: ' + queryId);
        System.debug('Done: ' + done);
        
        // Loop through metadata map
        for (String key : metadataMap.keySet()) {
            Map<String, Object> fieldInfo = (Map<String, Object>) metadataMap.get(key);
            System.debug('Field: ' + key);
            System.debug('  Type: ' + (String) fieldInfo.get('type'));
            System.debug('  Place in Order: ' + ((Decimal) fieldInfo.get('placeInOrder')).intValue()); // Cast to Decimal first, then to Integer
            System.debug('  Type Code: ' + ((Decimal) fieldInfo.get('typeCode')).intValue()); // Cast to Decimal first, then to Integer
        }
    }
}