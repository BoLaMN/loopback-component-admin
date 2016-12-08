'use strict';
angular.module('loopback-admin').directive('mdSidemenu', function () {
    return {
        restrict: 'E',
        scope: {
            menu: '='
        },
        template: '<ul>\n  <li ng-repeat="child in ::menu">\n    <md-button layout="row" layout-align="space-between start" class="md-black-primary-default background" ng-click="ctrl.select(child.state, child.params)">\n      <md-icon ng-if="child.icon" md-font-set="material-icons" class="md-raised md-black-primary-hue-1 text">{{ :: child.icon }}</md-icon>\n      <span flex class="md-black-primary-hue-1 text">{{ :: child.name | modelToHuman }}</span>\n    </md-button>\n  </li>\n</ul>',
        controllerAs: 'ctrl',
        controller: function ($state) {
            var vm;
            vm = this;
            vm.select = function (state, params) {
                return $state.go(state, params);
            };
        }
    };
});
