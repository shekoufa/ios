/**
 * Created by nono on 9/30/15.
 */
app.controller('UploadController', ['$rootScope', '$scope', '$cordovaFileTransfer', '$state', '$ionicLoading', 'synchronise', '$sce',
    function ($rootScope, $scope, $cordovaFileTransfer, $state, $ionicLoading, synchronise, $sce) {
        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        };
        $scope.uploadFile = function (key) {
            $scope.description = $("#media-description").val();
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner><p>Uploading...</p>'
            });
            var options = new FileUploadOptions();
            options.fileKey = 'photo';
            var fileNameArray = $rootScope.currentPhoto.split("/");
            var fileName = fileNameArray[fileNameArray.length - 1];
            if(key == "photo"){
                options.fileName = fileName + ".jpg";
                options.mimeType = "image/jpeg";
            }else {
                options.fileName = fileName + ".mp4";
                options.mimeType = "video/mp4";
            }
            var params = new Object();
            params.team_id = $rootScope.currentTeamId;
            params.auth_code = window.localStorage['devAuthCode'];
            params.device_id = $rootScope.deviceId;
            params.description = $scope.description;
            options.params = params;
            var theHeaders = {'Authorization': "Basic " + "username" + ":" + "password"};
            options.headers = theHeaders;
            options.chunkedMode = false;
            var url = "http://app.heyorca.com:8080/app/upload_as_media";
            console.log("The options: "+JSON.stringify(options));
            var ft = new FileTransfer();
            if(key == "video"){
                $rootScope.currentPhoto = $sce.trustAsResourceUrl($rootScope.currentPhoto).toString();
                console.log("Current Photo: "+$rootScope.currentPhoto);
            }
            ft.upload($rootScope.currentPhoto, url, function (response) {
                var responseJson = JSON.parse(response.response);
                if (responseJson.success) {
                    app.makeSwal("Done!", "You successfully uploaded your file to <b>" + $rootScope.currentTeamName + "</b> library", "success", true);
                    $rootScope.devAuthCode = responseJson.data.user.device_authentication_code;
                    synchronise.synchroniseAuthCode(window.localStorage['devAuthCode'], $rootScope.devAuthCode, $rootScope.deviceId)
                        .success(function (response) {
                            window.localStorage['devAuthCode'] = $rootScope.devAuthCode;
                            $state.go('app.media');
                        }).error(function (error) {
                            console.log("This is sync error response: " + JSON.stringify(error));
                        });
                } else {
                    console.log(JSON.stringify(responseJson));
                    app.makeSwal("Ooops...", "The was some problems while uploading your file. Try again.", "error", true);
                }
                $ionicLoading.hide();
            }, function (error) {
                app.makeSwal("Connection problems?", "Please check your internet connection and try again", "error", true);
                $ionicLoading.hide();
            }, options);
        }
    }]);


