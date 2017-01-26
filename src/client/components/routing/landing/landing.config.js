'use strict';
angular.module('loopback-admin').config(function ($stateProvider) {
    return $stateProvider.state('landing', {
        url: '/landing',
        templateUrl: "templates/routing/landing-page.tpl.html",
        controller: 'LandingPageController',
        controllerAs: 'landing',
        resolve: {
            background: function (Flickr) {
                return Flickr.getBackgroundImage();
            }
        }
    });
});
