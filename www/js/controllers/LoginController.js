/**
 * Created by nono on 9/30/15.
 */
app.controller('LoginController', ['$rootScope', '$scope', '$state', '$location',
    '$cordovaDevice', '$ionicHistory', 'login', 'synchronise', '$ionicLoading',
    function ($rootScope, $scope, $state, $location, $cordovaDevice, $ionicHistory, login, synchronise, $ionicLoading) {
        $scope.loginData = {};
        window.ionic.Platform.ready(function () {
            $rootScope.deviceId = $cordovaDevice.getUUID();
            if (window.localStorage['devAuthCode']) {
                $scope.doLogin("recurring");
            }else{
                $("#login-form").show();
            }
        });
        $scope.gotoLink = function (link) {
            window.open(encodeURI(link), '_self', 'location=yes');
        }
        $scope.doLogin = function (type) {
            var termsOk = true;
            if(type == "new" && $("#termsaccept").prop('checked')==false){
                termsOk = false;
            }
            if(!termsOk){
                app.makeSwal("","Don't you agree with our Terms of Service and Privacy Policy?!","warning",true);
                return;
            }
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner><p>Logging you in...</p>'
            });
            var deviceId = $rootScope.deviceId;
            var userName = $scope.loginData.username;
            var password = $scope.loginData.password;
            var auth_code = window.localStorage['devAuthCode'];
            if(type=="new"){
                login.login(userName, password, deviceId).success(function (response) {
                    console.log("Login response: "+JSON.stringify(response));
                    if (response.success) {
                        $rootScope.userData = response.data;
                        $rootScope.userId = $scope.userData.id;
                        $rootScope.userName = $scope.userData.first_name;
                        $rootScope.userThumbnail = $scope.userData.profilepic_thumb;
//                        $rootScope.teams = $scope.userData.editable_teams;
                        $rootScope.teams = $scope.userData.teams;
                        $rootScope.devAuthCode = $scope.userData.device_authentication_code;
                        synchronise.synchroniseAuthCode(window.localStorage['devAuthCode'], $rootScope.devAuthCode, $rootScope.deviceId)
                            .success(function (response) {
                                window.localStorage['devAuthCode'] = $rootScope.devAuthCode;
                                $ionicHistory.nextViewOptions({
                                    disableBack: true
                                });
                                $state.go('app.teams');
                                $rootScope.loggedIn = 'true';
                            }).error(function (error) {
                                console.log("This is sync error response: " + JSON.stringify(error));
                            });
                        $ionicLoading.hide();
                    } else {
                        app.makeSwal("Ooops!", response.data, 'error', true);
                        $ionicLoading.hide();
                    }
                }).error(function (error) {
                    console.log(JSON.stringify(error));
                    app.makeSwal("Connection problems?", "Please check your internet connection and try again", "error", true);
                    $ionicLoading.hide();
                });
            }else if(type == "recurring"){
                login.recurringLogin(auth_code,deviceId).success(function(response){
                    if (response.success) {
                        $rootScope.userData = response.data;
                        $rootScope.userId = $scope.userData.id;
                        $rootScope.userName = $scope.userData.first_name;
                        $rootScope.userThumbnail = $scope.userData.profilepic_thumb;
//                        $rootScope.teams = $scope.userData.editable_teams;
                        $rootScope.teams = $scope.userData.teams;
                        $rootScope.devAuthCode = $scope.userData.device_authentication_code;
                        synchronise.synchroniseAuthCode(window.localStorage['devAuthCode'], $rootScope.devAuthCode, $rootScope.deviceId)
                            .success(function (response) {
                                window.localStorage['devAuthCode'] = $rootScope.devAuthCode;
                                $ionicHistory.nextViewOptions({
                                    disableBack: true
                                });
                                $state.go('app.teams');
                                $rootScope.loggedIn = 'true';
                            }).error(function (error) {
                                console.log("This is sync error response: " + JSON.stringify(error));
                            });
                        $ionicLoading.hide();
                    } else {
                        app.makeSwal("Ooops!", "Seems like we are out of sync! Let's login again.", 'error', true);
                        $("#login-form").show();
                        $ionicLoading.hide();
                    }
                }).error(function(error){
                    console.log(JSON.stringify(error));
                    app.makeSwal("Connection problems?", "Please check your internet connection and try again", "error", true);
                    $ionicLoading.hide();
                });
            }

        };
    }]);


