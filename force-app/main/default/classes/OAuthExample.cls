public class OAuthExample {
    @AuraEnabled
    public static List<Object> getAccessToken(String input) {
        String endpoint = 'https://login.salesforce.com/services/oauth2/token';
        String clientId = '3MVG9H_KVs6V9LiP.vS5LDnOR13E4Z2QskHKiJKPqu6dg5q88foj_gHq1kWEQXv97VHT6b6VcM_RzRftnPm67';
        String clientSecret = 'A8C9045442442F6F8D485095FE0BB6EDDB8EAFF03CAA56AAC5CA68D90408A4A0';
        String username = 'deekshithgowda978@gmail.com2024/07/25_16-35-7.demo';
        String password = 'Kasetti@555';
        String grantType = 'password';
        HttpRequest req = new HttpRequest();
        req.setEndpoint(endpoint);
        req.setMethod('POST');
        req.setHeader('Content-Type', 'application/x-www-form-urlencoded');
        String body = 'grant_type=' + EncodingUtil.urlEncode(grantType, 'UTF-8') +
            '&client_id=' + EncodingUtil.urlEncode(clientId, 'UTF-8') +
            '&client_secret=' + EncodingUtil.urlEncode(clientSecret, 'UTF-8') +
            '&username=' + EncodingUtil.urlEncode(username, 'UTF-8') +
            '&password=' + EncodingUtil.urlEncode(password, 'UTF-8');
        req.setBody(body);
        Http http = new Http();
        HTTPResponse res = http.send(req);
        if (res.getStatusCode() == 200) {
            String responseBody = res.getBody();
            Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(responseBody);
            String accessToken = (String) responseMap.get('access_token');
            List<Object> data=new  List<Object>();
            Map<String,Object> dataObj=(Map<String,Object>)DataCloudOauth.getAccessToken(accessToken, input);
            List<Object> medication=(List<Object>)dataObj.get('data2');
            List<Object> practitioner=(List<Object>)dataObj.get('data3');
            List<Object> medrequest=(List<Object>)dataObj.get('data4');
            String patientName=(String)dataObj.get('patName');
            System.debug('patientName--------> '+patientName);
            Map<String,Object> mdb=new Map<String,Object>{'name'=>patientName,'medication'=>medication, 'practitioner'=>practitioner, 'medrequest'=>medrequest};
            data.add(mdb);
            // if(input=='e63wRTbPfr1p8UW81d8Seiw3'){
                //     return data;
                // 'id'=>'e63wRTbPfr1p8UW81d8Seiw3',
            // }else if(input=='123'){
                //     return data;
            // }
            return data;
        } else {
            System.debug('Error: ' + res.getStatusCode() + ' ' + res.getStatus());
            System.debug('Error Body: ' + res.getBody());
            return null;
        }
    }
}