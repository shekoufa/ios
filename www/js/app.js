// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'ui.router', 'ngCordova', 'oitozero.ngSweetAlert'])
    .run(function ($rootScope, $ionicPlatform, $ionicHistory, $state, $ionicPopup) {
//        https://echofresh.s3.amazonaws.com/d84063f5921194fd088ce754565f4768_preview.jpeg
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            $rootScope.loggedIn = 'false';
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
        $ionicPlatform.registerBackButtonAction(function (e) {
            e.preventDefault();
            function showConfirm() {
                swal({
                        title: "Exit?",
                        text: "Are you sure you want to close the application?",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Yes!",
                        closeOnConfirm: false
                    }, function () {
                        ionic.Platform.exitApp();
                    }
                );
            }
            // Is there a page to go back to?
            if ($ionicHistory.backView()) {
                $ionicHistory.goBack();
            } else {
                showConfirm();
            }
            return false;
        }, 101);
    })


    .config(function ($stateProvider, $urlRouterProvider, $compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
        //$compileProvider.imgSrcSanitizationWhitelist(/^\s(https|file|blob|cdvfile):|data:image/);
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html'
            })
            .state('app.login', {
                url: '/login',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/login.html'

                    }
                }
            })
            .state('app.teams', {
                url: '/teams',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/teams.html',
                        controller: 'TeamController'
                    }
                }
            })
            .state('app.team-gallery', {
                url: '/team-gallery',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/team-gallery.html',
                        controller: 'TeamGalleryController'
                    }
                },
                cache:false
            })
            .state('app.media', {
                url: '/media',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/media.html'
//                        controller: 'AppCtrl'
                    }
                }
            })
            .state('app.preview', {
                url: '/preview',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/preview.html'
//                        controller: 'AppCtrl'
                    }
                }
            })
            .state('app.aboutus', {
                url: '/aboutus',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/aboutus.html'
                    }
                }
            })
//            .state('app.login',{
//                url: '/login',
//                views: {
//                    'menuContent': {
//                        templateUrl: 'templates/login.html',
//                        controller: 'LoginController'
//                    }
//                }
//            })
//
//            .state('app.single', {
//                url: '/playlists/:playlistId',
//                views: {
//                    'menuContent': {
//                        templateUrl: 'templates/playlist.html',
//                        controller: 'PlaylistCtrl'
//                    }
//                }
//            });
        $urlRouterProvider.otherwise('/app/login');
    });
app.makeSwal = function (title, text, type, html) {
    swal({
        title: title,
        text: text,
        type: type,
        html: html
    });
};