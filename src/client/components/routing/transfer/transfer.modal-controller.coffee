'use strict'

angular.module 'loopback-admin'

.controller 'transferModel', ($mdDialog, $rootScope, row, model) ->
  resource = model.resource

  vm = this

  vm.form = {}

  vm.model = model
  vm.properties = model.properties

  vm.row = row or new resource()
  vm.transfer = 
    amount: 0

  vm.property = 
    name: 'amount'
    type: 'number'
    getModel: ->
      return model

  vm.submit = (data) ->

    success = ->
      $mdDialog.hide()
      $rootScope.showToast 'transferdSuccessfully'

    error = (response) ->
      { status, message } = response.data.error

    #   for code, errorType of codes
    #     vm.form[code].$setValidity errorType[0], false

      vm.errorMessages = message

      $rootScope.showToast errorMessages, 'warn'
    
    model.resource['sendMoney'] {id: data.id}, vm.transfer, success, error

  return

