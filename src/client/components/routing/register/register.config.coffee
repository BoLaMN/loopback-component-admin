'use strict'

angular.module 'loopback-admin'

.config ($stateProvider) ->

  $stateProvider

    .state 'register',
      url: '/register'
      controller: 'registerController'
      controllerAs: 'registerController'
      views:
        '':
          templateUrl: "templates/routing/register-login.tpl.html"
          controller: ($scope) ->
            $scope.pageTitle = 'Register'
        'content@register':
          templateUrl: "templates/routing/register.tpl.html"
