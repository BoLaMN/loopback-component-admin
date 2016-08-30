'use strict'

angular.module 'loopback-admin'

.config ($stateProvider) ->

  $stateProvider

    .state 'transfer',
      url: '/transfer'
      templateUrl: 'templates/routing/transfer.tpl.html'
      controller: 'transferController'
      controllerAs: 'transferController'
      parent: 'browser'
      resolve:
        User: (config) ->
          config.getModel 'ZPUser'


