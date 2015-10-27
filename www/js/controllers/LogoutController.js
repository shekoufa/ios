/**
 * Created by nono on 9/30/15.
 */
app.controller('LogoutController', ['$rootScope', '$scope', '$state', '$location', '$ionicLoading',
    '$ionicHistory','$ionicSideMenuDelegate',
    function ($rootScope, $scope, $state, $location, $ionicLoading,
              $ionicHistory, $ionicSideMenuDelegate) {
        $scope.loginData = {};
        $scope.doLogout = function () {
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner><p>Bye Bye...</p>'
            });
            window.localStorage['devAuthCode'] = "";
            $rootScope.loggedIn = 'false';
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
            $ionicSideMenuDelegate.toggleLeft();
            $state.go("app.login");
            window.location.reload(true);

        };
        $scope.showLogin = function () {
            $("#login-form").show();
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go("app.login");
        };
    }]);


