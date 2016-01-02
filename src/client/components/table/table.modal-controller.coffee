'use strict'

angular.module 'loopback-admin'

.controller 'RowDataModel', ($mdDialog, $rootScope, type, row, rows, model) ->
  resource = model.resource
  fn = if type is 'edit' then 'save' else 'create'

  vm = this

  vm.form = {}

  vm.model = model
  vm.properties = model.properties

  vm.row = row or new resource()
  vm.type = type

  vm.submit = (data) ->

    success = ->
      $mdDialog.hide()
      $rootScope.showToast type + 'dUserSuccessfully'

      if type is 'create'
        rows.push data

    error = (response) ->
      { codes, messages } = response.data.error.details

      for code, errorType of codes
        vm.form[code].$setValidity errorType[0], false

      vm.errorMessages = messages

      $rootScope.showToast type + 'dUserFailed', 'warn'

    data['$' + fn] success, error

  return

