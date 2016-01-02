'use strict'

angular.module 'loopback-admin'

.config ($stateProvider) ->

  $stateProvider

    .state 'landing',
      url: '/landing'
      templateUrl: "templates/routing/landing-page.tpl.html"
      controller: 'LandingPageController'
      controllerAs: 'landing'
      resolve:
        background: (Flickr) ->
          Flickr.getBackgroundImage()
