/**
 * Created by nono on 9/30/15.
 */
app.controller('CameraController', ['$rootScope', '$scope', '$state', '$location',
    '$cordovaDevice', '$cordovaCamera', '$cordovaFile', '$ionicHistory', 'login', 'Camera',
    function ($rootScope, $scope, $state, $location, $cordovaDevice, $cordovaCamera, $cordovaFile, $ionicHistory, login, Camera) {
        $scope.getGallery = function () {
            var options = {
                quality: 49,
                destinationType: navigator.camera.DestinationType.FILE_URI,
                sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM,
                encodingType: navigator.camera.EncodingType.JPEG,
                mediaType: navigator.camera.MediaType.ALLMEDIA,
                correctOrientation: true
            };
            Camera.getMyGallery(options).then(function (imageURI) {
                console.log("Gallery before: " + JSON.stringify(imageURI));
                if (imageURI.substring(0, 21) == "content://com.android") {
                    var photo_split = imageURI.split("%3A");
                    if (imageURI.indexOf("video") > -1) {
                        imageURI = "content://media/external/video/media/" + photo_split[1];
                    } else {
                        imageURI = "content://media/external/images/media/" + photo_split[1];
                    }
                }
                if (imageURI.indexOf("video") > -1) {
                    $rootScope.action = "video";
                } else {
                    $rootScope.action = "photo";
                }
                $rootScope.currentPhoto = imageURI;
                $state.go("app.preview");
            }, function (error) {
                console.log("Gallery error: " + JSON.stringify(error));
            });
        }
        $scope.takePhoto = function () {
            var options = {
                quality: 50,
                destinationType: navigator.camera.DestinationType.FILE_URI,
                sourceType: navigator.camera.PictureSourceType.CAMERA,
                encodingType: navigator.camera.EncodingType.JPEG,
                correctOrientation: true
            };
            Camera.takeAPhoto(options).then(function (imageURI) {
                $rootScope.action = "photo";
                $rootScope.currentPhoto = imageURI;
                $state.go("app.preview");
            }, function (error) {
                console.log(JSON.stringify(error));
            });
        };
        $scope.recordVideo = function () {
            Camera.recordVideo().then(function (mediaFiles) {
                $rootScope.action = "video";
                $rootScope.currentPhoto = mediaFiles[0].fullPath;
                $state.go("app.preview");
            }, function (err) {
                console.log(err);
            });
        };
    }]);


