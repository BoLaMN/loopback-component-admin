'use strict'

angular.module 'loopback-admin'

.config ($stateProvider) ->

  $stateProvider

    .state 'dashboard',
      parent: 'browser'
      url: '/dashboard'
      controller: 'DashboardController'
      controllerAs: 'dashboardController'
      templateUrl: "templates/routing/dashboard.tpl.html"
      resolve:
        models: (config) ->
          config.getModels()
