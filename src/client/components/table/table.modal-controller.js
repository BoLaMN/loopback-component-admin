'use strict';
angular.module('loopback-admin').controller('RowDataModel', function ($mdDialog, $rootScope, type, row, rows, model) {
    var fn, resource, vm;
    resource = model.resource;
    fn = type === 'edit' ? 'prototype$updateAttributes' : 'create';
    vm = this;
    vm.form = {};
    vm.model = model;
    vm.properties = model.properties;
    vm.row = row || new resource();
    vm.type = type;
    vm.submit = function (data) {
        var error, success;
        success = function () {
            $mdDialog.hide();
            $rootScope.showToast(type + 'dUserSuccessfully');
            if (type === 'create') {
                return rows.push(data);
            }
        };
        error = function (response) {
            var code, codes, errorType, messages, ref;
            ref = response.data.error.details, codes = ref.codes, messages = ref.messages;
            for (code in codes) {
                errorType = codes[code];
                vm.form[code].$setValidity(errorType[0], false);
            }
            vm.errorMessages = messages;
            return $rootScope.showToast(type + 'dUserFailed', 'warn');
        };
        return data['$' + fn](success, error);
    };
});