'use strict'

angular.module 'loopback-admin'

.controller 'AccountSettingsController', ($upload, $rootScope, activeTab, LoopBackAuth, LoopBackAdminConfiguration) ->
  vm = this

  User = LoopBackAdminConfiguration.userModel

  vm.auth = LoopBackAuth

  vm.activeTab = activeTab

  vm.changePassword = (passwords) ->
    User.changePassword(passwords).$promise
      .then (data) =>
        $rootScope.showToast data
        $rootScope.closeModal()
        return
    return

  vm.getUsernameForCurrentUser = ->
    if !@current or !@current.email
      return

    if @current.username
      return @current.username

    @current.email.split('@')[0]

  vm.updateAccountSettings = (settings, id) ->
    payload = settings or @auth.currentUserData
    userId = id or @auth.currentUserId

    User.update({ where:{id:userId} }, payload).$promise
      .then (data) =>
        if !settings
          $rootScope.showToast 'profileUpdateSuccess', true
          $rootScope.closeModal()
          @current = data
        return

  vm.removeAvatar = ->
    $http.delete(LoopBackAdminConfiguration.urlBase + '/employees/' + @current.id + '/avatar').success (data) ->
      @current.avatar_url = ''
      $rootScope.showToast data
      return


  vm.upload = (files) ->
    if !files.length
      return

    file = files[0]

    $upload.upload
      url: LoopBackAdminConfiguration.urlBase + '/employees/' + id + '/avatar'
      file: file
    .success (data) -> LoopBackAuth.currentUserData.avatar_url = data
    .error (data, code) -> if code == 422 then showToast data.file[0]

  return

.directive 'cmsCurrentUser', ->
  replace: true
  templateUrl: 'templates/common/current-user.html'
  controllerAs: 'ctrl'
  controller: ($state, LoopBackAuth, $mdDialog, $upload) ->
    vm = this

    vm.auth = LoopBackAuth

    vm.state = $state

    vm.openMenu = ($mdOpenMenu, ev) ->
      $mdOpenMenu ev

    vm.showAccountSettingsModal = ($event, fieldToFocus) ->
      options =
        templateUrl: 'templates/modals/account-settings.html'
        targetEvent: $event
        locals:
          activeTab: 'settings'
        clickOutsideToClose: true
        controllerAs: 'modal'
        controller: 'AccountSettingsController'

      if fieldToFocus is 'avatar'
        options.locals.activeTab = 'avatar'

      $mdDialog.show options

      return
    return

.directive 'cmsToolbar', ->
  replace: true
  scope: { title: '=' }
  templateUrl: 'templates/common/toolbar.html'
