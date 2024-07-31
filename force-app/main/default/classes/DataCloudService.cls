        public class DataCloudService {
            public static Map<String,Object> queryDataCloud(String accessTokens, String input) {
                System.debug('FirstClass DDDDDDDDDDDD BBBBBBBBBB '+input);
                // queryJson1(accessTokens);
                List<Object> data2=(List<Object>)queryJsonMedication(accessTokens, input);
                List<Object> data3=(List<Object>)queryJsonPractioner(accessTokens, input);
                List<Object> data4=(List<Object>)queryJsonMedRequest(accessTokens , input);
                String data5=(String)queryJsonPatient(accessTokens , input);
                System.debug('namamamamamadbdbddbdb :'+data5);
                Map<String,Object>  data=new Map<String,Object>{'data2'=>data2,'data3'=>data3,'data4'=>data4,'patName'=>data5 };
                return data;
            }
            public static  List<Object> queryJsonMedication(String accessTokens, String input){
                String endpoint = 'https://g-yt8ylfg02wmnddh04tkyjtmm.c360a.salesforce.com/api/v1/query';
                String accessToken = accessTokens;
                String queryJson2 = '{"sql" : "SELECT EpicMedication_Epic_MedicationR_ED6B1B2D__dll.display__c,EpicMedication_Epic_MedicationR_ED6B1B2D__dll.Epic_MedicationRequesId__c, EpicMedication_Epic_MedicationR_ED6B1B2D__dll.DataSourceObject__c, EpicMedication_Epic_MedicationR_ED6B1B2D__dll.Medication_Id__c, EpicMedication_Epic_MedicationR_ED6B1B2D__dll.DataSource__c, EpicMedication_Epic_MedicationR_ED6B1B2D__dll.Epic_MedicationRequesId__c, EpicMedication_Epic_MedicationR_ED6B1B2D__dll.id__c FROM EpicMedication_Epic_MedicationR_ED6B1B2D__dll"}';
                
                HttpRequest req = new HttpRequest();
                req.setEndpoint(endpoint);
                req.setMethod('POST');
                req.setHeader('Authorization', 'Bearer ' + accessToken);
                req.setHeader('Content-Type', 'application/json');
                req.setBody(queryJson2);
                Http http = new Http();
                HTTPResponse res = http.send(req);
                if (res.getStatusCode() == 200) {
                    String responseBody = res.getBody();
                    Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(responseBody);
                    List<Object> data=(List<Object>)responseMap.get('data');
                    return data;
                } else {
                    System.debug('Error 2: ' + res.getStatusCode() + ' ' + res.getStatus());
                    System.debug('Error Body: ' + res.getBody());
                    return null;
                }
            }
            public static  List<Object> queryJsonPractioner(String accessTokens, String input){
                String endpoint = 'https://g-yt8ylfg02wmnddh04tkyjtmm.c360a.salesforce.com/api/v1/query';
                String accessToken = accessTokens;
                String queryJson3 = '{"sql" : "SELECT EpicMedication_Epic_MedicationR_ED6B1B2C__dll.DataSource__c,EpicMedication_Epic_MedicationR_ED6B1B2C__dll.DataSourceObject__c, EpicMedication_Epic_MedicationR_ED6B1B2C__dll.Practitioner_Id__c, EpicMedication_Epic_MedicationR_ED6B1B2C__dll.display__c, EpicMedication_Epic_MedicationR_ED6B1B2C__dll.Epic_MedicationRequestId__c, EpicMedication_Epic_MedicationR_ED6B1B2C__dll.Id__c, EpicMedication_Epic_MedicationR_ED6B1B2C__dll.Practitioner_Type__c FROM EpicMedication_Epic_MedicationR_ED6B1B2C__dll"}';
                
                HttpRequest req = new HttpRequest();
                req.setEndpoint(endpoint);
                req.setMethod('POST');
                req.setHeader('Authorization', 'Bearer ' + accessToken);
                req.setHeader('Content-Type', 'application/json');
                req.setBody(queryJson3);
                Http http = new Http();
                HTTPResponse res = http.send(req);
                if (res.getStatusCode() == 200) {
                    String responseBody = res.getBody();
                    Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(responseBody);
                    List<Object> data=(List<Object>)responseMap.get('data');
                    return data;
                } else {
                    System.debug('Error 3: ' + res.getStatusCode() + ' ' + res.getStatus());
                    System.debug('Error Body: ' + res.getBody());
                    return null;
                }
            }
            public static List<Object> queryJsonMedRequest(String accessTokens, String input){
                String endpoint = 'https://g-yt8ylfg02wmnddh04tkyjtmm.c360a.salesforce.com/api/v1/query';
                String accessToken = accessTokens;
                
                String patientId = input;
            String queryJson4 = '{"sql" : "SELECT HCDC_MedicationRequest_EAA27AF2__dll.category__c, HCDC_MedicationRequest_EAA27AF2__dll.codeSet__c, HCDC_MedicationRequest_EAA27AF2__dll.courseOfTherapyType__c, HCDC_MedicationRequest_EAA27AF2__dll.id__c, HCDC_MedicationRequest_EAA27AF2__dll.identifier__c, HCDC_MedicationRequest_EAA27AF2__dll.intent__c, HCDC_MedicationRequest_EAA27AF2__dll.medication__c, HCDC_MedicationRequest_EAA27AF2__dll.PatientId__c, HCDC_MedicationRequest_EAA27AF2__dll.Practitioner__c, HCDC_MedicationRequest_EAA27AF2__dll.status__c FROM HCDC_MedicationRequest_EAA27AF2__dll WHERE PatientId__c = \'' + patientId + '\'" }';
            
            HttpRequest req = new HttpRequest();
            req.setEndpoint(endpoint);
            req.setMethod('POST');
            req.setHeader('Authorization', 'Bearer ' + accessToken);
            req.setHeader('Content-Type', 'application/json');
            req.setBody(queryJson4);
            Http http = new Http();
            HTTPResponse res = http.send(req);
            if (res.getStatusCode() == 200) {
                String responseBody = res.getBody();
                Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(responseBody);
                List<Object> data=(List<Object>)responseMap.get('data');
                return data;
            } else {
                System.debug('Error 4: ' + res.getStatusCode() + ' ' + res.getStatus());
                System.debug('Error Body: ' + res.getBody());
                System.debug('queryJson4 BdbdbdbD: '+ 'Error');
                return null;
            }
        }
        public static String queryJsonPatient(String accessTokens, String input) {
            String endpoint = 'https://g-yt8ylfg02wmnddh04tkyjtmm.c360a.salesforce.com/api/v1/query';
            String accessToken = accessTokens;
            String patientId = input;
        String queryJson5 = '{"sql" : "SELECT firstName__c, lastName__c FROM HCDC_Patient_EAA344B4__dll WHERE id__c = \'' + patientId + '\'" }';
        
        HttpRequest req = new HttpRequest();
        req.setEndpoint(endpoint);
        req.setMethod('POST');
        req.setHeader('Authorization', 'Bearer ' + accessToken);
        req.setHeader('Content-Type', 'application/json');
        req.setBody(queryJson5);
        
        Http http = new Http();
        HTTPResponse res = http.send(req);
        String name = '';
        
        if (res.getStatusCode() == 200) {
            String responseBody = res.getBody();
            Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(responseBody);
            List<Object> data = (List<Object>) responseMap.get('data');
            Map<String,Object> nameMap=(Map<String,Object>)data[0];
            name=nameMap.get('firstName__c')+' '+nameMap.get('lastName__c');
        } else {
            System.debug('Error 5: ' + res.getStatusCode() + ' ' + res.getStatus());
            System.debug('Error Body: ' + res.getBody());
        }
        
        return name;
    }
}