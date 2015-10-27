app.factory('Camera', ['$q', function($q) {

    return {
        takeAPhoto: function(options) {
            var q = $q.defer();
            navigator.camera.getPicture(function(result) {
                q.resolve(result);
            }, function(err) {
                    q.reject(err);
            },options);
            return q.promise;
        },
        getMyGallery:function(options){
            var q = $q.defer();
            navigator.camera.getPicture(function(result){
                q.resolve(result);
            }, function(err){
                q.reject(err);
            },options);
            return q.promise;
        },
        recordVideo: function(){
            var q = $q.defer();
            navigator.device.capture.captureVideo(captureSuccess, captureError, null);
            function captureSuccess(result){
                console.log(JSON.stringify(result));
                q.resolve(result);
            }
            function captureError(err){
                console.log(JSON.stringify(err));
                q.reject(err);
            }
            return q.promise;
        }
    }
}]);