'use strict'

angular.module 'loopback-admin'

.config ($stateProvider) ->

  $stateProvider

    .state 'error',
      parent: 'app'
      templateUrl: 'templates/routing/error.tpl.html'
      onEnter: (config, $log, $state) ->
        $log.error config, $state
