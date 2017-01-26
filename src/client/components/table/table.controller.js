'use strict';
angular.module('loopback-admin').controller('TableCtrl', function ($mdDialog, $rootScope, $log) {
    var ref, refreshRows, vm;
    vm = this;
    vm.deferred = null;
    vm.filter = {
        options: {
            debounce: 500
        }
    };
    vm.query = {
        filter: null,
        limit: 10,
        orderPlain: 'id',
        orderDirection: 'DESC',
        page: 1
    };
    vm.resource = (ref = vm.model) != null ? ref.resource : void 0;
    vm.rows = [];
    vm.selected = [];
    vm.deleteRows = function (selected, $event) {
        var options;
        options = {
            title: 'Delete Items',
            body: 'Are you sure you want to delete these items?',
            event: $event
        };
        $rootScope.confirm(options).then(function () {
            var idx, indx, item;
            item = selected.pop();
            indx = vm.rows.indexOf(item);
            idx = selected.indexOf(item);
            item.$remove();
            if (indx > -1) {
                return vm.rows.splice(indx, 1);
            }
        });
    };
    vm.showRowModal = function (type, row, $event) {
        return $mdDialog.show({
            locals: {
                row: row,
                type: type,
                rows: vm.rows,
                model: vm.model
            },
            templateUrl: "templates/modals/table.tpl.html",
            targetEvent: $event,
            clickOutsideToClose: true,
            controller: 'RowDataModel',
            controllerAs: 'modal'
        });
    };
    refreshRows = function () {
        var filter, page, params;
        page = parseInt(vm.query.page, 10);
        filter = {
            include: vm.model.relationNames,
            skip: (page - 1) * vm.query.limit,
            limit: vm.query.limit,
            order: vm.query.orderPlain + ' ' + vm.query.orderDirection
        };
        params = {
            filter: filter
        };
        vm.rows = vm.resource.find(params, function (data, headers) {
            return vm.count = parseInt(headers('x-total-count'));
        });
        vm.deferred = vm.rows.$promise;
        return vm.deferred;
    };
    if (vm.resource && angular.isFunction(vm.resource.find)) {
        refreshRows();
    }
    vm.removeFilter = function () {
        vm.filter.show = false;
        vm.query.filter = '';
        if (vm.filter.form.$dirty) {
            vm.filter.form.$setPristine();
            refreshRows();
        }
    };
    vm.onOrderChange = function (order, $event) {
        var direction, orderPlain;
        $log.info('Scope Order: ' + vm.query.order);
        $log.info('Order: ' + order);
        direction = 'ASC';
        if (order.charAt(0) === '-') {
            direction = 'DESC';
            orderPlain = order.slice(1);
        }
        vm.query.order = order;
        vm.query.orderPlain = orderPlain || order;
        vm.query.orderDirection = direction;
        refreshRows();
    };
    vm.onPageChange = function (page, limit) {
        $log.info('Scope Page: ' + vm.query.page + ' Scope Limit: ' + vm.query.limit);
        $log.info('Page: ' + page + ' Limit: ' + limit);
        vm.query.page = page;
        vm.query.limit = limit;
        refreshRows();
    };
    vm.onFilterChange = function (filter, $event) {
        $log.info('Scope Filter: ' + vm.query.filter);
        $log.info('Filter: ' + filter);
        vm.query.page = 1;
        refreshRows();
    };
});