/**
 * Created by nono on 9/30/15.
 */
app.factory('login', ['$http', function($http) {
//    return $http.post('http://app.heyorca.com:8080/app/login',{identity:"nadia_test8@gmail.com",password:"nadia_test8@gmail.com",device_id:"11112222eeeeffff"});
    return {
        login: function(username, password,deviceId){
            return $http({
                method: "post",
                url: "http://app.heyorca.com:8080/app/login",
                data:'identity='+username+'&password='+password+'&device_id='+deviceId,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
        },
        recurringLogin: function(authCode, deviceId){
            return $http({
                method: "post",
                url: "http://app.heyorca.com:8080/app/login",
                data:'auth_code='+authCode+'&device_id='+deviceId,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
        }
    }
}]);

