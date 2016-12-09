angular.module('loopback-admin', ['ui.router', 'md.data.table', 'ngSanitize', 'ngAnimate', 'ngAria', 'ngMaterial',
    'angularFileUpload', 'loopback-admin.services',
    'loopback-admin.theme'])
    .config(function ($urlRouterProvider, $mdThemingProvider, $mdIconProvider, $compileProvider) {

        var dark;

        $compileProvider.debugInfoEnabled(true);
        $mdThemingProvider.theme('default').primaryPalette('blue');
        dark = $mdThemingProvider.extendPalette('grey', {
            contrastDefaultColor: 'light'
        });
        $mdThemingProvider.definePalette('dark', dark);
        $mdThemingProvider.theme('black').primaryPalette('dark', {
            "default": '900'
        });
        $urlRouterProvider.when('', '/landing').when('/', '/landing').otherwise(function ($injector, $location) {
            var state;
            state = $injector.get('$state');
            state.go('error');
            return $location.path();
        });
        $mdIconProvider.defaultFontSet('material-icons');
    });
