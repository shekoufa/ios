/**
 * Created by nono on 9/30/15.
 */
app.factory('synchronise', ['$http', function ($http) {
//    return $http.post('http://app.heyorca.com:8080/app/login',{identity:"nadia_test8@gmail.com",password:"nadia_test8@gmail.com",device_id:"11112222eeeeffff"});
    return {
        synchroniseAuthCode: function (currentCode, newCode, deviceId) {
            return $http({
                method: "post",
                url: "http://app.heyorca.com:8080/app/update_auth_code",
                data: 'device_id=' + deviceId + '&auth_code=' + currentCode + '&updated_auth_code=' + newCode,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
        }
    }
}]);

