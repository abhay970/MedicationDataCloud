public class DataCloudOauth {
    
    public static Map<String,Object> getAccessToken(String accessTokens, String input) {
        String endpoint = 'https://ka1721905524179.my.salesforce.com/services/a360/token';
        String accessToken = accessTokens;
        String grantType = 'urn:salesforce:grant-type:external:cdp';
        String subjectToken = accessTokens;
        String subjectTokenType = 'urn:ietf:params:oauth:token-type:access_token';
        
        // Create the HTTP request
        HttpRequest req = new HttpRequest();
        req.setEndpoint(endpoint);
        req.setMethod('POST');
        req.setHeader('Authorization', 'Bearer ' + accessToken);
        req.setHeader('Content-Type', 'application/x-www-form-urlencoded');
        
        // Set the request body
        String body = 'grant_type=' + EncodingUtil.urlEncode(grantType, 'UTF-8') +
            '&subject_token=' + EncodingUtil.urlEncode(subjectToken, 'UTF-8') +
            '&subject_token_type=' + EncodingUtil.urlEncode(subjectTokenType, 'UTF-8');
        req.setBody(body);
        
        Http http = new Http();
        HTTPResponse res = http.send(req);
        if (res.getStatusCode() == 200) {
            String responseBody = res.getBody();
            
            Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(responseBody);
            String accessTokenvalue = (String) responseMap.get('access_token');
            Map<String,Object> data=(Map<String,Object>)DataCloudService.queryDataCloud(accessTokenvalue, input);
            
            return data;
        } else {
            System.debug('Error: ' + res.getStatusCode() + ' ' + res.getStatus());
            System.debug('Error Body: ' + res.getBody());
            return null;
        }
    }
}