'use strict'

angular.module 'loopback-admin'

.directive 'cmsSocialButtons', ->
  restrict: 'E'
  templateUrl: 'templates/common/social-buttons.tpl.html'
  controller: 'SocialLoginCtrl'
  controllerAs: 'social'

.controller 'SocialLoginCtrl', (LoopBackAdminConfiguration, LoopBackAuth, $http, $state, $mdDialog, $mdToast) ->
  vm = this

  vm.credentials = {}

  vm.loginWith = (service) ->
    url = LoopBackAdminConfiguration.urlBase + '/auth/social/' + service

    left = screen.width / 2 - (580 / 2)
    top = screen.height / 2 - (450 / 2)

    window.$tempScope = vm

    options = [
      'menubar=0'
      'location=0'
      'toolbar=0'
      'titlebar=0'
      'status=0'
      'width=580'
      'height=450'
      'left=' + left
      'top=' + top
      ].join ', '

    window.open url, 'Authenticate Account', options

    return

  vm.socialLoginCallback = (user) ->
    window.$tempScope = null

    if user
      LoopBackAuth.currentUserData = user
      $state.go 'dashboard'
    else
      vm.requestUserEmail()

    return

  vm.socialLoginCallbackError = ->
    $mdToast.show $mdToast.simple(position: 'bottom right').content('genericSocialError')
    return

  vm.createAndLoginUser = ->
    $http.post LoopBackAdminConfiguration.urlBase + '/auth/social/request-email-callback', email: vm.credentials.email
    .success (data) -> $state.go 'dashboard'
    .error (data) -> if data.code is 1 then vm.requestUserPassword()

  vm.connectAccounts = ->
    $http.post LoopBackAdminConfiguration.urlBase + '/auth/social/connect-accounts', password: vm.credentials.password
      .success (data) -> $state.go 'dashboard'
      .error (data) -> vm.errorMessage = data

  vm.requestUserPassword = ($event) ->
    $mdDialog.show
      templateUrl: 'templates/modals/request-password.html'
      targetEvent: $event
      controller: 'SocialLoginCtrl'
    return

  vm.requestUserEmail = ($event) ->
    $mdDialog.show
      templateUrl: 'templates/modals/request-email.html'
      targetEvent: $event
      controller: 'SocialLoginCtrl'
    return

  return
