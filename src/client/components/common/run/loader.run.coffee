'use strict'

angular.module 'loopback-admin'

.run ($rootScope, $mdDialog, $mdToast) ->

  $rootScope.closeModal = ->
    $mdDialog.hide()

  $rootScope.getAvatar = (user) ->
    if user.avatar_url
      return user.avatar_url

    'images/avatar.png'

  $rootScope.showToast = (message, theme = 'default') ->
    toast = $mdToast.simple
      position: 'bottom right'
      hideDelay: 2200

    toast.content(message).theme(theme)

    $mdToast.show toast

    return

  $rootScope.confirm = (options) ->
    dialog = $mdDialog.confirm()
      .title options.title
      .textContent options.body
      .ariaLabel 'Confirm dialog.'
      .targetEvent options.event
      .ok 'Okay'
      .cancel 'Cancel'

    $mdDialog.show dialog

  return


