/**
 * Created by nono on 9/30/15.
 */
app.controller('TeamController', ['$rootScope', '$scope', '$state', '$location',
    '$cordovaDevice', '$ionicHistory', 'login', 'synchronise', '$ionicLoading',
    function ($rootScope, $scope, $state) {
        $scope.setTeamId = function(teamId, teamName){
            $('.team-div').removeClass("current-team");
            angular.element("#team-div"+teamId).addClass("current-team");
            $rootScope.currentTeamId = teamId;
            $rootScope.currentTeamName = teamName;
//            $rootScope.$broadcast('scroll.infiniteScrollComplete');
            $state.go('app.media');

        }
    }]);


