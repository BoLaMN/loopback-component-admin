'use strict'

angular.module 'loopback-admin'

.directive 'mdSidemenu', ->
  restrict: 'E'
  scope: { menu: '=' }
  template: '''
    <ul>
      <li ng-repeat="child in ::menu">
        <md-button layout="row" layout-align="space-between start" class="md-black-primary-default background" ng-click="ctrl.select(child.state, child.params)">
          <md-icon ng-if="child.icon" md-font-set="material-icons" class="md-raised md-black-primary-hue-1 text">{{ :: child.icon }}</md-icon>
          <span flex class="md-black-primary-hue-1 text">{{ :: child.name | modelToHuman }}</span>
        </md-button>
      </li>
    </ul>'''
  controllerAs: 'ctrl'
  controller: ($state) ->
    vm = this

    vm.select = (state, params) ->
      $state.go state, params

    return