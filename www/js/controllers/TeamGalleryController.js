/**
 * Created by nono on 9/30/15.
 */
app.controller('TeamGalleryController', ['$rootScope', '$scope', '$state', 'remoteGallery',
    'synchronise', '$ionicLoading', '$ionicPopup','$ionicSideMenuDelegate', '$ionicHistory',
    function ($rootScope, $scope, $state, remoteGallery,
              synchronise, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate, $ionicHistory) {
//        $rootScope.remoteImages = [];
//        $rootScope.pageSize = 10;
//        $rootScope.currentPage = 0;
//        $rootScope.hasMoreData  = true;
//        console.log("I'm in here, $rootScope.hasMoreData: "+$rootScope.hasMoreData)
        $scope.loadMore = function(){
            console.log("i'm loading more! currentpage= "+$rootScope.currentPage+" , pageSize= "+$rootScope.pageSize+" , teamId= "+$rootScope.currentTeamId);
            remoteGallery.fetchRemoteGallery($rootScope.currentPage,$rootScope.pageSize,$rootScope.deviceId,window.localStorage['devAuthCode'],$rootScope.currentTeamId)
                .success(function(data){
                    $rootScope.currentPage = $rootScope.currentPage+$rootScope.pageSize;
                    if(data.success){
                        console.log("data.success: "+JSON.stringify(data.success));
                    }else{
                        console.log("data.error: "+JSON.stringify(data));
                    }
                    if(data.success){
                        $rootScope.remoteResponse = data;
                        $rootScope.remoteImages = $rootScope.remoteImages.concat($rootScope.remoteResponse.data.medias);
                        $rootScope.devAuthCode = data.data.user.device_authentication_code;
                        synchronise.synchroniseAuthCode(window.localStorage['devAuthCode'], $rootScope.devAuthCode, $rootScope.deviceId)
                            .success(function (response) {
                                window.localStorage['devAuthCode'] = $rootScope.devAuthCode;
                            }).error(function (error) {
                                console.log("This is sync error response: " + JSON.stringify(error));
                            });
                        console.log("media.length: "+$rootScope.remoteResponse.data.medias.length)
                        if($rootScope.remoteResponse.data.medias.length >= $rootScope.pageSize){
                            $rootScope.hasMoreData = true;
                        }else{
                            $rootScope.hasMoreData = false;
                        }
                    }else{
                        $rootScope.hasMoreData = false;
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    console.log("Finally has more data?!"+$rootScope.hasMoreData);
                }).error(function(error){
                    console.log("Error occured in fetching remote gallery: "+JSON.stringify(error));
                });
        };
        $scope.showSweetPhoto = function(mediaName, mediaPreview, mediaType, mediaPath){
//            app.makeSwal(mediaName,"<img class='poppedup-media' src='"+mediaUrl+"'/>",null,true);
            var theTemplate = "";
            if(mediaType == '101'){
                theTemplate = "<div style='width: 100%'><img class='poppedup-media' src='"+mediaPreview+"'/></div> ";
            }else{
                theTemplate =
                    "<div style='width: 100%'>" +
                        "<video class='poppedup-media' controls>" +
                            "<source src='"+mediaPath+"' type='video/mp4'>" +
                        "</video>" +
                    "</div>";
            }
            $ionicPopup.show({
                template: theTemplate,
                title: mediaName,
                scope: $scope,
                cssClass: "ionic-popup",
                buttons: [
                    { text: 'Ok' }
                ]
            });
        };
        $scope.gotoTeamLibrary = function(){
            $ionicHistory.clearCache();
            $ionicSideMenuDelegate.toggleLeft();
            $rootScope.remoteImages = [];
            $rootScope.pageSize = 10;
            $rootScope.currentPage = 0;
            $rootScope.hasMoreData  = true;
            console.log("I'm in here, $rootScope.hasMoreData: "+$rootScope.hasMoreData)
//            $scope.loadMore();
//            $scope.$broadcast('scroll.infiniteScrollComplete');
            $state.go("app.team-gallery",{}, {reload: true});
        }

    }]);


