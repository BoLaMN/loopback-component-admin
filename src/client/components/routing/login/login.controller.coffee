'use strict'

angular.module 'loopback-admin'

.controller 'loginController', ($state, $rootScope, LoopBackAdminConfiguration, $scope, $mdDialog) ->
  vm = this

  User = LoopBackAdminConfiguration.userModel

  vm.userLoginField = LoopBackAdminConfiguration.userLoginField

  vm.login = (credentials) ->
    request = User.login credentials

    request.$promise
      .then (data) ->
        $state.go 'dashboard'
        return
      .catch (err) ->
        vm.error = err
        return

  vm.showPasswordResetModal = ($event) ->
    $mdDialog.show
      templateUrl: 'templates/modals/reset-password.html'
      targetEvent: $event
      controller: 'ResetPasswordCtrl'
      controllerAs: 'resetPassword'
      clickOutsideToClose: true

    return
  return

.controller 'ResetPasswordCtrl', ($mdDialog, LoopBackAdminConfiguration) ->
  vm = this

  User = LoopBackAdminConfiguration.userModel

  vm.resetPasswordError = ''

  vm.closePasswordResetModal = ->
    vm.resetPasswordError = ''
    vm.passResetCredentials = {}

    $mdDialog.hide()

    return

  vm.resetPassword = (passResetCredentials) ->
    User.resetPassword(passResetCredentials).$promise
      .then (data) ->
        $rootScope.showToast data
        vm.closePasswordResetModal()
      .catch (data) ->
        vm.resetPasswordError = data.email or data

        return
      return

  return
