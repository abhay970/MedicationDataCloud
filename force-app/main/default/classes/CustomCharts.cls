public class CustomCharts {
    public class Observation {
        public String name { get; set; }
        public String observedSubjectId { get; set; }
        public String codeId { get; set; }
        public String DeviceId { get; set; }
        public String observationStatus { get; set; }
        public String baselineUnitId { get; set; }
        public String effectiveDateTime { get; set; }
        public String expectedValueId { get; set; }
        public String methodId { get; set; }
        public Boolean hasMetExpectedValue { get; set; }
        public String issuedDateTime { get; set; }
        public Integer numericValue { get; set; }
    }
    @AuraEnabled
    public static Object parseAndDisplay() {
        String jsonString = '[{"name":"Blood Pressure","observedSubjectId":"0017i00001ZwmgOAAR","codeId":"0hs7i0000008DbUAAU","DeviceId":"02i7i000007jzJCAAY","observationStatus":"Final","baselineUnitId":"0hE7i0000007Wv6EAE","effectiveDateTime":"2024-06-11T08:53:24.000+0000","expectedValueId":"0hL7i0000004CAfEAM","methodId":"0iP7i000000Dkk5EAC","hasMetExpectedValue":false,"issuedDateTime":"2024-06-13T08:53:24.000+0000","numericValue":92},{"name":"Blood Pressure","observedSubjectId":"0017i00001ZwmgOAAR","codeId":"0hs7i0000008DbUAAU","DeviceId":"02i7i000007jzJCAAY","observationStatus":"Final","baselineUnitId":"0hE7i0000007Wv6EAE","effectiveDateTime":"2024-06-14T08:53:24.000+0000","expectedValueId":"0hL7i0000004CAfEAM","methodId":"0iP7i000000Dkk5EAC","hasMetExpectedValue":false,"issuedDateTime":"2024-06-13T08:53:24.000+0000","numericValue":84},{"name":"Blood Pressure","observedSubjectId":"0017i00001ZwmgOAAR","codeId":"0hs7i0000008DbUAAU","DeviceId":"02i7i000007jzJCAAY","observationStatus":"Final","baselineUnitId":"0hE7i0000007Wv6EAE","effectiveDateTime":"2024-06-19T08:53:24.000+0000","expectedValueId":"0hL7i0000004CAfEAM","methodId":"0iP7i000000Dkk5EAC","hasMetExpectedValue":false,"issuedDateTime":"2024-06-13T08:53:24.000+0000","numericValue":105},{"name":"Blood Pressure","observedSubjectId":"0017i00001ZwmgOAAR","codeId":"0hs7i0000008DbUAAU","DeviceId":"02i7i000007jzJCAAY","observationStatus":"Final","baselineUnitId":"0hE7i0000007Wv6EAE","effectiveDateTime":"2024-06-25T08:53:24.000+0000","expectedValueId":"0hL7i0000004CAfEAM","methodId":"0iP7i000000Dkk5EAC","hasMetExpectedValue":false,"issuedDateTime":"2024-06-13T08:53:24.000+0000","numericValue":95},{"name":"Blood Pressure","observedSubjectId":"0017i00001ZwmgOAAR","codeId":"0hs7i0000008DbUAAU","DeviceId":"02i7i000007jzJCAAY","observationStatus":"Final","baselineUnitId":"0hE7i0000007Wv6EAE","effectiveDateTime":"2024-06-29T08:53:24.000+0000","expectedValueId":"0hL7i0000004CAfEAM","methodId":"0iP7i000000Dkk5EAC","hasMetExpectedValue":false,"issuedDateTime":"2024-06-13T08:53:24.000+0000","numericValue":118}]';
        List<Observation> observations = (List<Observation>) JSON.deserialize(jsonString, List<Observation>.class);
        Map<String, Integer> observationData = new Map<String, Integer>();
        List<Map<String, Object>> datalst=new List<Map<String, Object>>();
        for (Observation obs : observations) {
            observationData.put(obs.effectiveDateTime, obs.numericValue);
            datalst.add(new Map<String, Object>{'numericValue'=>obs.numericValue,'effectiveDateTime'=>obs.effectiveDateTime});
        }
        for (String effectiveDateTime : observationData.keySet()) {
            String datePart = effectiveDateTime.substring(0, 10); 
            System.debug('Effective DateTime: ' + datePart);
            System.debug('Numeric Value: ' + observationData.get(effectiveDateTime));
        }
        return datalst;
    }
}