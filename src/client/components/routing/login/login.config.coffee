'use strict'

angular.module 'loopback-admin'

.config ($stateProvider) ->

  $stateProvider

    .state 'login',
      url: '/login'
      views:
        '':
          templateUrl: "templates/routing/register-login.tpl.html"
          controller: ($scope) ->
            $scope.pageTitle = 'Login'
        'content@login':
          templateUrl: "templates/routing/login.tpl.html"
          controller: 'loginController'
          controllerAs: 'loginController'