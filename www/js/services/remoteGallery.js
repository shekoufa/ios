/**
 * Created by nono on 9/30/15.
 */
app.factory('remoteGallery', ['$http', function($http) {
//    return $http.post('http://app.heyorca.com:8080/app/login',{identity:"nadia_test8@gmail.com",password:"nadia_test8@gmail.com",device_id:"11112222eeeeffff"});
    return {
        fetchRemoteGallery: function(pageNo, pageSize, deviceId, authCode, teamId){
            return $http({
                method: "post",
                url: "http://app.heyorca.com:8080/app/get_library/"+pageSize+"/"+pageNo+"/",
                data:'device_id='+deviceId+'&auth_code='+authCode+'&team_id='+teamId,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
        }
    }
}]);

