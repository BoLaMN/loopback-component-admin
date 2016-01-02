'use strict'

angular.module 'loopback-admin'

.config ($stateProvider) ->

  $stateProvider

    .state 'logout',
      url: '/logout'
      controller: 'logoutController'
      controllerAs: 'logoutController'
