'use strict'

angular.module 'loopback-admin'

.config ($stateProvider) ->

  $stateProvider
    .state 'app',
      abstract: true
      template: '<div ui-view></div>'
      resolve:
        user: (LoopBackAdminConfiguration) ->
          User = LoopBackAdminConfiguration.userModel

          User.getCurrent().$promise
        config: (user, LoopBackAdminConfiguration) ->
          LoopBackAdminConfiguration.initialize()

    .state 'browser',
      parent: 'app'
      abstract: true
      controller: 'BrowserController'
      controllerAs: 'browserController'
      templateUrl: "templates/routing/browser.tpl.html"
      resolve:
        config: (LoopBackAdminConfiguration) ->
          LoopBackAdminConfiguration.initialize()
