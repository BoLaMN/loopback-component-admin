'use strict'

angular.module 'loopback-admin'

.config ($stateProvider) ->

  $stateProvider

    .state 'list',
      url: '/:model/list'
      parent: 'browser'
      controller: 'ListController'
      controllerAs: 'listController'
      templateUrl: 'templates/routing/list.tpl.html'
      resolve:
        model: (config, $stateParams) ->
          config.getModel $stateParams.model

  return
