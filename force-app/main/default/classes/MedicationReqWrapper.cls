public class MedicationReqWrapper {
    public static void parseAndDisplay() {
        // JSON string
        String jsonString = '{"data":[{"DataSourceObject__c":"HCDC_MedicationRequest_EAA27AF2","DataSource__c":"HCDC_0cef71e6_7a52_456e_bd9f_64a5083af484","authoredOn__c":"2013-04-29T00:00:00.000+00:00","category__c":"Community","courseOfTherapyType__c":"Short course (acute) therapy","id__c":"eJk0ebNUOTKx9f80aYoZPHg3","identifier__c":"882173","intent__c":"plan","PatientId__c":"e.Rxkbv0HmfyDyboA-LtyRQ3","reportedBoolean__c":true,"status__c":"active"},{"DataSourceObject__c":"HCDC_MedicationRequest_EAA27AF2","DataSource__c":"HCDC_0cef71e6_7a52_456e_bd9f_64a5083af484","authoredOn__c":"2013-04-29T00:00:00.000+00:00","category__c":"Community","courseOfTherapyType__c":"Short course (acute) therapy","id__c":"emhFW-QGYoC9ijvvE.RB4cw3","identifier__c":"882174","intent__c":"order","PatientId__c":"e.Rxkbv0HmfyDyboA-LtyRQ3","status__c":"completed"}],"startTime":"2024-07-29T10:58:15.089944Z","endTime":"2024-07-29T10:58:15.284815Z","rowCount":2,"queryId":"20240729_061904_02083_uauus","done":true,"metadata":{"intent__c":{"type":"VARCHAR","placeInOrder":8,"typeCode":12},"status__c":{"type":"VARCHAR","placeInOrder":13,"typeCode":12},"codeSet__c":{"type":"VARCHAR","placeInOrder":4,"typeCode":12},"identifier__c":{"type":"VARCHAR","placeInOrder":7,"typeCode":12},"category__c":{"type":"VARCHAR","placeInOrder":3,"typeCode":12},"PatientId__c":{"type":"VARCHAR","placeInOrder":10,"typeCode":12},"reportedBoolean__c":{"type":"BOOLEAN","placeInOrder":12,"typeCode":16},"courseOfTherapyType__c":{"type":"VARCHAR","placeInOrder":5,"typeCode":12},"Practitioner__c":{"type":"VARCHAR","placeInOrder":11,"typeCode":12},"DataSource__c":{"type":"VARCHAR","placeInOrder":1,"typeCode":12},"medication__c":{"type":"VARCHAR","placeInOrder":9,"typeCode":12},"DataSourceObject__c":{"type":"VARCHAR","placeInOrder":0,"typeCode":12},"id__c":{"type":"VARCHAR","placeInOrder":6,"typeCode":12},"authoredOn__c":{"type":"TIMESTAMP WITH TIME ZONE","placeInOrder":2,"typeCode":2014}}}';
        
        // Deserialize the JSON string into a Map
        Map<String, Object> resultMap = (Map<String, Object>) JSON.deserializeUntyped(jsonString);
        
        // Create a map to store data entries
        List<Map<String, Object>> dataEntries = new List<Map<String, Object>>();
        
        // Extract and map data
        List<Object> dataList = (List<Object>) resultMap.get('data');
        for (Object dataObj : dataList) {
            Map<String, Object> dataMap = (Map<String, Object>) dataObj;
            dataEntries.add(dataMap);
        }
        
        // Create a map to store metadata information
        Map<String, Object> metadataInfo = (Map<String, Object>) resultMap.get('metadata');
        
        // Debug the mapped data
        Integer index = 1;
        for (Map<String, Object> dataMap : dataEntries) {
            System.debug('Data Entry ' + index + ':');
            System.debug('  DataSourceObject__c: ' + (String) dataMap.get('DataSourceObject__c'));
            System.debug('  DataSource__c: ' + (String) dataMap.get('DataSource__c'));
            System.debug('  authoredOn__c: ' + (String) dataMap.get('authoredOn__c'));
            System.debug('  category__c: ' + (String) dataMap.get('category__c'));
            System.debug('  courseOfTherapyType__c: ' + (String) dataMap.get('courseOfTherapyType__c'));
            System.debug('  id__c: ' + (String) dataMap.get('id__c'));
            System.debug('  identifier__c: ' + (String) dataMap.get('identifier__c'));
            System.debug('  intent__c: ' + (String) dataMap.get('intent__c'));
            System.debug('  PatientId__c: ' + (String) dataMap.get('PatientId__c'));
            System.debug('  reportedBoolean__c: ' + (Boolean) dataMap.get('reportedBoolean__c'));
            System.debug('  status__c: ' + (String) dataMap.get('status__c'));
            
            index++;
        }
        
        // Debug the other metadata information
        // System.debug('Start Time: ' + (Datetime) resultMap.get('startTime'));
        // System.debug('End Time: ' + (Datetime) resultMap.get('endTime'));
        System.debug('Row Count: ' + ((Decimal) resultMap.get('rowCount')).intValue()); // Cast to Decimal first, then to Integer
        System.debug('Query ID: ' + (String) resultMap.get('queryId'));
        System.debug('Done: ' + (Boolean) resultMap.get('done'));
        
        // Debug the metadata fields
        System.debug('Metadata Information:');
        for (String key : metadataInfo.keySet()) {
            Map<String, Object> fieldInfo = (Map<String, Object>) metadataInfo.get(key);
            
            System.debug('  Field: ' + key);
            System.debug('    Type: ' + (String) fieldInfo.get('type'));
            System.debug('    Place in Order: ' + ((Decimal) fieldInfo.get('placeInOrder')).intValue()); // Cast to Decimal first, then to Integer
            System.debug('    Type Code: ' + ((Decimal) fieldInfo.get('typeCode')).intValue()); // Cast to Decimal first, then to Integer
        }
    }
}