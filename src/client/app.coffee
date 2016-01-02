
angular.module 'loopback-admin', [
  'ui.router'
  'md.data.table'
  'ngSanitize'
  'ngAnimate'
  'ngAria'
  'ngMaterial'
  'angularFileUpload'
  'loopback-admin.services'
  'loopback-admin.theme'
]

.config ($urlRouterProvider, $mdThemingProvider, $mdIconProvider, $compileProvider) ->
  $compileProvider.debugInfoEnabled true

  $mdThemingProvider
    .theme 'default'
    .primaryPalette 'blue'

  dark = $mdThemingProvider.extendPalette 'grey',
    contrastDefaultColor: 'light'

  $mdThemingProvider.definePalette 'dark', dark

  $mdThemingProvider.theme 'black'
    .primaryPalette 'dark', default: '900'

  $urlRouterProvider
    .when '', '/landing'
    .when '/', '/landing'

    .otherwise ($injector, $location) ->
      state = $injector.get '$state'
      state.go 'error'
      $location.path()

  $mdIconProvider.defaultFontSet 'material-icons'

  return

