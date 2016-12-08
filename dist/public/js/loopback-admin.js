angular.module('loopback-admin', ['ui.router', 'md.data.table', 'ngSanitize', 'ngAnimate', 'ngAria', 'ngMaterial',
    'angularFileUpload', 'loopback-admin.services',
    'loopback-admin.theme'])
    .config(["$urlRouterProvider", "$mdThemingProvider", "$mdIconProvider", "$compileProvider", function ($urlRouterProvider, $mdThemingProvider, $mdIconProvider, $compileProvider) {

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
    }]);

'use strict';
angular.module('loopback-admin').controller('AccountSettingsController', ["$upload", "$rootScope", "activeTab", "LoopBackAuth", "LoopBackAdminConfiguration", function ($upload, $rootScope, activeTab, LoopBackAuth, LoopBackAdminConfiguration) {
    var User, vm;
    vm = this;
    User = LoopBackAdminConfiguration.userModel;
    vm.auth = LoopBackAuth;
    vm.activeTab = activeTab;
    vm.changePassword = function (passwords) {
        User.changePassword(passwords).$promise.then((function (_this) {
            return function (data) {
                $rootScope.showToast(data);
                $rootScope.closeModal();
            };
        })(this));
    };
    vm.getUsernameForCurrentUser = function () {
        if (!this.current || !this.current.email) {
            return;
        }
        if (this.current.username) {
            return this.current.username;
        }
        return this.current.email.split('@')[0];
    };
    vm.updateAccountSettings = function (settings, id) {
        var payload, userId;
        payload = settings || this.auth.currentUserData;
        userId = id || this.auth.currentUserId;
        return User.update({
            where: {
                id: userId
            }
        }, payload).$promise.then((function (_this) {
            return function (data) {
                if (!settings) {
                    $rootScope.showToast('profileUpdateSuccess', true);
                    $rootScope.closeModal();
                    _this.current = data;
                }
            };
        })(this));
    };
    vm.removeAvatar = function () {
        return $http["delete"](LoopBackAdminConfiguration.urlBase + '/employees/' + this.current.id + '/avatar').success(function (data) {
            this.current.avatar_url = '';
            $rootScope.showToast(data);
        });
    };
    vm.upload = function (files) {
        var file;
        if (!files.length) {
            return;
        }
        file = files[0];
        return $upload.upload({
            url: LoopBackAdminConfiguration.urlBase + '/employees/' + id + '/avatar',
            file: file
        }).success(function (data) {
            return LoopBackAuth.currentUserData.avatar_url = data;
        }).error(function (data, code) {
            if (code === 422) {
                return showToast(data.file[0]);
            }
        });
    };
}]).directive('cmsCurrentUser', function () {
    return {
        replace: true,
        templateUrl: 'templates/common/current-user.html',
        controllerAs: 'ctrl',
        controller: ["$state", "LoopBackAuth", "$mdDialog", "$upload", function ($state, LoopBackAuth, $mdDialog, $upload) {
            var vm;
            vm = this;
            vm.auth = LoopBackAuth;
            vm.state = $state;
            vm.openMenu = function ($mdOpenMenu, ev) {
                return $mdOpenMenu(ev);
            };
            vm.showAccountSettingsModal = function ($event, fieldToFocus) {
                var options;
                options = {
                    templateUrl: 'templates/modals/account-settings.html',
                    targetEvent: $event,
                    locals: {
                        activeTab: 'settings'
                    },
                    clickOutsideToClose: true,
                    controllerAs: 'modal',
                    controller: 'AccountSettingsController'
                };
                if (fieldToFocus === 'avatar') {
                    options.locals.activeTab = 'avatar';
                }
                $mdDialog.show(options);
            };
        }]
    };
}).directive('cmsToolbar', function () {
    return {
        replace: true,
        scope: {
            title: '='
        },
        templateUrl: 'templates/common/toolbar.html'
    };
});
'use strict';
angular.module('loopback-admin').directive('mdSidemenu', function () {
    return {
        restrict: 'E',
        scope: {
            menu: '='
        },
        template: '<ul>\n  <li ng-repeat="child in ::menu">\n    <md-button layout="row" layout-align="space-between start" class="md-black-primary-default background" ng-click="ctrl.select(child.state, child.params)">\n      <md-icon ng-if="child.icon" md-font-set="material-icons" class="md-raised md-black-primary-hue-1 text">{{ :: child.icon }}</md-icon>\n      <span flex class="md-black-primary-hue-1 text">{{ :: child.name | modelToHuman }}</span>\n    </md-button>\n  </li>\n</ul>',
        controllerAs: 'ctrl',
        controller: ["$state", function ($state) {
            var vm;
            vm = this;
            vm.select = function (state, params) {
                return $state.go(state, params);
            };
        }]
    };
});

'use strict';
angular.module('loopback-admin').directive('cmsSocialButtons', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/common/social-buttons.tpl.html',
        controller: 'SocialLoginCtrl',
        controllerAs: 'social'
    };
}).controller('SocialLoginCtrl', ["LoopBackAdminConfiguration", "LoopBackAuth", "$http", "$state", "$mdDialog", "$mdToast", function (LoopBackAdminConfiguration, LoopBackAuth, $http, $state, $mdDialog, $mdToast) {
    var vm;
    vm = this;
    vm.credentials = {};
    vm.loginWith = function (service) {
        var left, options, top, url;
        url = LoopBackAdminConfiguration.urlBase + '/auth/social/' + service;
        left = screen.width / 2 - (580 / 2);
        top = screen.height / 2 - (450 / 2);
        window.$tempScope = vm;
        options = ['menubar=0', 'location=0', 'toolbar=0', 'titlebar=0', 'status=0', 'width=580', 'height=450', 'left=' + left, 'top=' + top].join(', ');
        window.open(url, 'Authenticate Account', options);
    };
    vm.socialLoginCallback = function (user) {
        window.$tempScope = null;
        if (user) {
            LoopBackAuth.currentUserData = user;
            $state.go('dashboard');
        } else {
            vm.requestUserEmail();
        }
    };
    vm.socialLoginCallbackError = function () {
        $mdToast.show($mdToast.simple({
            position: 'bottom right'
        }).content('genericSocialError'));
    };
    vm.createAndLoginUser = function () {
        return $http.post(LoopBackAdminConfiguration.urlBase + '/auth/social/request-email-callback', {
            email: vm.credentials.email
        }).success(function (data) {
            return $state.go('dashboard');
        }).error(function (data) {
            if (data.code === 1) {
                return vm.requestUserPassword();
            }
        });
    };
    vm.connectAccounts = function () {
        return $http.post(LoopBackAdminConfiguration.urlBase + '/auth/social/connect-accounts', {
            password: vm.credentials.password
        }).success(function (data) {
            return $state.go('dashboard');
        }).error(function (data) {
            return vm.errorMessage = data;
        });
    };
    vm.requestUserPassword = function ($event) {
        $mdDialog.show({
            templateUrl: 'templates/modals/request-password.html',
            targetEvent: $event,
            controller: 'SocialLoginCtrl'
        });
    };
    vm.requestUserEmail = function ($event) {
        $mdDialog.show({
            templateUrl: 'templates/modals/request-email.html',
            targetEvent: $event,
            controller: 'SocialLoginCtrl'
        });
    };
}]);

'use strict';
angular.module('loopback-admin').factory('entryFormatter', ["$filter", function ($filter) {
    return {
        formatDate: function (format) {
            return function (date) {
                return $filter('date')(new Date(date), format);
            };
        },
        formatNumber: function (format) {
            return function (number) {
                return $filter('numeraljs')(number, format);
            };
        },
        formatProperty: function (property) {
            var format, formatDate, formatNumber, label, type;
            label = property.label || property.name;
            type = property.type;
            switch (type) {
                case 'boolean':
                case 'choice':
                case 'choices':
                case 'string':
                case 'text':
                case 'wysiwyg':
                case 'email':
                case 'json':
                case 'file':
                case 'template':
                    (function (entry) {
                        return {
                            name: label,
                            value: entry.values[property.name]
                        };
                    });
                    break;
                case 'number':
                case 'float':
                    format = property.format;
                    formatNumber = this.formatNumber(format);
                    (function (entry) {
                        return {
                            name: label,
                            value: formatNumber(entry.values[property.name])
                        };
                    });
                    break;
                case 'date':
                case 'datetime':
                    format = property.format;
                    if (!format) {
                        format = type === 'date' ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm:ss';
                    }
                    formatDate = this.formatDate(format);
                    (function (entry) {
                        return {
                            name: label,
                            value: formatDate(entry.values[property.name])
                        };
                    });
                    break;
                case 'reference':
                    (function (entry) {
                        return {
                            name: label,
                            value: entry.values[property.name]
                        };
                    });
                    break;
                case 'referenced_many':
                case 'referenced_list':
                    return;
            }
        },
        getFormatter: function (properties) {
            var propertiesFormatters;
            propertiesFormatters = properties.map(this.formatProperty.bind(this));
            return function (entry) {
                var result;
                result = {};
                propertiesFormatters.map(function (formatter) {
                    if (!formatter) {
                        return;
                    }
                    return formatter(entry);
                }).forEach(function (property) {
                    if (!property) {
                        return;
                    }
                    result[property.name] = property.value;
                });
                return result;
            };
        }
    };
}]);

'use strict';
angular.module('loopback-admin').factory('LoopbackInjector', ["$injector", function ($injector) {
    return function (modelName) {
        if ($injector.has(modelName)) {
            return $injector.get(modelName);
        } else {
            return void 0;
        }
    };
}]);

'use strict';
angular.module('loopback-admin').provider('stringUtils', function () {
    return {
        camelCase: function (text) {
            var f;
            if (!text) {
                return text;
            }
            f = text.charAt(0).toUpperCase();
            text = f + text.substr(1);
            return text.replace(/[-_.\s](.)/g, function (match, group1) {
                return ' ' + group1.toUpperCase();
            });
        },
        $get: function () {
            return {
                camelCase: this.camelCase
            };
        }
    };
});

'use strict';
angular.module('loopback-admin').filter('numeraljs', function () {
    return function (input, format) {
        if (input === null || format === null) {
            return input;
        }
        if (format === '') {
            return '';
        }
        return numeral(input).format(format);
    };
});

'use strict';
angular.module('loopback-admin').filter('modelToHuman', function () {
    return function (input) {
        if (input == null) {
            input = '';
        }
        return input.replace(/([a-z])([A-Z])/g, '$1 $2');
    };
});

'use strict';
angular.module('loopback-admin').provider('LoopBackAdminConfiguration', ["LoopBackResourceProvider", function (LoopBackResourceProvider) {
    var config, configOptions, initialized;
    config = null;
    initialized = false;
    configOptions = null;
    return {
        setConfig: function (newConfig) {
            return configOptions = newConfig;
        },
        $get: ["Model", "$q", "$http", "$injector", function (Model, $q, $http, $injector) {
            var application, buildMenuFromModels;
            buildMenuFromModels = function () {
                return application.models.map(function (model) {
                    return {
                        name: model.label,
                        state: "list",
                        params: {
                            model: model.name
                        }
                    };
                });
            };
            application = {
                models: [],
                urlBase: LoopBackResourceProvider.getUrlBase(),
                options: configOptions,
                defaultErrorMessage: function (response) {
                    var body;
                    body = response.data;
                    if (typeof body === 'object') {
                        body = JSON.stringify(body);
                    }
                    return 'Oops, an error occured else (code: ' + response.status + ') ' + body;
                },
                errorMessage: this.defaultErrorMessage,
                getErrorMessage: function (response) {
                    if (typeof this.errorMessage === 'function') {
                        return this.errorMessage(response);
                    }
                    return this.errorMessage;
                },
                userModel: $injector.get(configOptions.userModel),
                userLoginField: configOptions.userLoginField,
                addModel: function (model) {
                    var foundModel;
                    if (!model) {
                        throw new Error("No model given");
                    }
                    foundModel = this.getModelByName(this.models, model.name);
                    if (!foundModel) {
                        this.models.push(model);
                    }
                    return this;
                },
                getModel: function (modelName) {
                    var foundModel;
                    foundModel = this.getModelByName(this.models, modelName);
                    if (!foundModel) {
                        foundModel = this.getModelByName(this.config.models, modelName);
                        if (foundModel) {
                            foundModel = new Model(modelName, foundModel);
                            this.addModel(foundModel);
                        }
                    }
                    return foundModel;
                },
                getModels: function () {
                    var defer;
                    defer = $q.defer();
                    application.initialize().then(function (cfg) {
                        return defer.resolve(cfg.models);
                    });
                    return defer.promise;
                },
                getModelByName: function (models, modelName) {
                    return models.filter(function (e) {
                        return e.name === modelName;
                    })[0];
                },
                initialize: function () {
                    var defer;
                    defer = $q.defer();
                    if (initialized && application.models.length) {
                        defer.resolve(application);
                    } else {
                        if (angular.isString(configOptions.resourcePath)) {
                            $http.get(configOptions.resourcePath).success(function (data) {
                                var i, len, model, models;
                                models = data.models;
                                application.config = data;
                                for (i = 0, len = models.length; i < len; i++) {
                                    model = models[i];
                                    application.addModel(new Model(model.name, model));
                                }
                                application.menu = buildMenuFromModels();
                                defer.resolve(application);
                                return initialized = true;
                            }).error(function (err) {
                                return defer.reject(err);
                            });
                        } else {
                            defer.resolve(application);
                        }
                    }
                    return defer.promise;
                }
            };
            return application;
        }]
    };
}]);

angular.module('loopback-admin').filter('text', ["typedText", "$log", function (typedText, $log) {
    var filter;
    filter = function (input) {
        if (typedText[input]) {
            return typedText[input];
        } else {
            $log.info('text string missing: ' + input);
            return 'MISSING ' + input;
        }
    };
    filter.$stateful = true;
    return filter;
}]).constant('typedText', {
    homeTagline: 'Loopback Admin',
    homeButtonText: 'Login now',
    wrongCredentials: 'Wrong email address or password',
    noAccount: 'Don\'t have an account?',
    registerHere: 'Register here.',
    login: 'Login',
    password: 'Password',
    email: 'Email',
    enterYourTwitterEmail: 'Please enter your twitter email',
    userWithEmailExists: 'User with this email already exists.',
    enterYourPassword: 'Enter your password',
    requestPassword: 'An account with this email address already exists, if you want to connect the two accounts please enter existing accounts password in the field below.',
    wrongPassword: 'Password seems to be incorrect, please try again.',
    connect: 'Connect',
    genericSocialError: 'An error occured, please try again later.',
    rememberMe: 'Remember me',
    loginWithFacebook: 'Login with facebook',
    loginWithTwitter: 'Login with twitter',
    loginWithGoogle: 'Login with google',
    orLoginWith: ' Or login with:',
    submit: 'Submit',
    close: 'Close',
    alreadyHaveAccount: 'Already have an account?',
    repeatPassword: 'Repeat Password',
    logInHere: 'Login in here.',
    register: 'Register',
    itemsSelected: 'Items Selected',
    upload: 'Upload',
    cancel: 'Cancel',
    create: 'Create',
    'new': 'New',
    searchResults: 'Search Results',
    items: 'Items',
    created: 'Created',
    description: 'Description',
    none: 'None',
    yes: 'Yes',
    no: 'No',
    editUsername: 'Edit Username',
    changeAvatar: 'Change Avatar',
    logOut: 'Log Out',
    accountSettings: 'Account Settings',
    confirm: 'Confirm',
    dashboard: 'Dashboard',
    username: 'Username',
    fullName: 'Full Name',
    firstName: 'First Name',
    lastName: 'Last Name',
    currentPassword: 'Current Password',
    passwordChangeSuccess: 'Your password was changed successfully.',
    avatarAcceptedFormats: 'Accepted formats: png, jpeg.',
    avatarResizeExpl: 'Your avatar will be resized to 200x200 (px) if it\'s bigger then that.',
    view: 'View',
    genericError: 'something went wrong, please try again later.',
    favoriteExists: 'You have already marked this photo as favorite.',
    passMatches: 'Password is correct.',
    passDoesntMatch: 'Incorrect password. Please try again.',
    profileUpdateSuccess: 'Your profile was updated successfully.',
    avatarRemoveSuccess: 'Removed avatar successfully.',
    permaDeletedItems: 'Permanently deleted {{ number }} items.',
    deleteItems: 'Delete Items',
    sureWantToDeleteItems: 'Are you sure you want to delete these items?',
    createdUserSuccessfully: 'Created user successfully.',
    updatedUserSuccessfully: 'Updated user successfully.',
    settingsUpdated: 'Updated settings successfully.',
    logOutSuccess: 'Logged out successfully.',
    deleteForever: 'Delete Forever',
    confirmPermaDelete: 'Are you sure you want to permanently delete these photo(s)?',
    'delete': 'Delete',
    permaDeleteWarning: 'Warning: this action is not undoable.',
    remove: 'Remove',
    addPassword: 'Add password.',
    remove: 'Remove.',
    add: 'Add',
    done: 'Done',
    passwordRecovery: 'Password Recovery',
    sendEmail: 'send Email',
    change: 'Change',
    passResetExpl: 'Please enter the email address associated with your account.',
    resetPassword: 'Reset Password',
    resetErrors: 'There were some problems with your input.',
    emailAddress: 'E-Mail Address',
    confirmPassword: 'Confirm Password',
    newPassword: 'New Password',
    forgot: 'Forgot?',
    role: 'Role',
    status: 'Status',
    expiresIn: 'Expires In',
    expiresAt: 'Expiry Date',
    acceptedAt: 'Accepted Date',
    users: 'Users',
    deleted: 'Deleted',
    search: 'search',
    edit: 'Edit',
    avatar: 'Avatar',
    id: 'ID',
    adminArea: 'Admin Area',
    dashboardArea: 'Dashboard Area',
    loginTitle: 'Login',
    registerTitle: 'Register',
    resetPasswordTitle: 'Reset Password'
});

'use strict';
angular.module('loopback-admin').run(["$state", "$window", "$rootScope", "$log", "LoopBackAdminConfiguration", function ($state, $window, $rootScope, $log, LoopBackAdminConfiguration) {
    var User;
    User = LoopBackAdminConfiguration.userModel;
    $rootScope.$on('$stateChangeSuccess', function () {
        return $window.scrollTo(0, 0);
    });
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        if (error.status === 404) {
            $state.go('error');
            event.preventDefault();
        } else if (error.status === 401) {
            $state.go('logout');
        } else {
            $log.error('State change error: ' + error.message);
            throw error;
        }
    });
    $rootScope.$on('$stateChangeStart', function ($event, toState, toParams, fromState, fromParams) {
        var changeState;
        if (!User.isAuthenticated()) {
            if (toState.name !== 'login' && toState.name !== 'register' && toState.name !== 'landing') {
                $event.preventDefault();
                changeState = $state.go('login');
                changeState.then(function () {
                    $rootScope.$broadcast('$stateChangeSuccess', toState.self, toParams, fromState.self, fromParams);
                });
            }
            return true;
        }
        return true;
    });
}]);

'use strict';
angular.module('loopback-admin').run(["$rootScope", "$mdDialog", "$mdToast", function ($rootScope, $mdDialog, $mdToast) {
    $rootScope.closeModal = function () {
        return $mdDialog.hide();
    };
    $rootScope.getAvatar = function (user) {
        if (user.avatar_url) {
            return user.avatar_url;
        }
        return 'images/avatar.png';
    };
    $rootScope.showToast = function (message, theme) {
        var toast;
        if (theme == null) {
            theme = 'default';
        }
        toast = $mdToast.simple({
            position: 'bottom right',
            hideDelay: 2200
        });
        toast.content(message).theme(theme);
        $mdToast.show(toast);
    };
    $rootScope.confirm = function (options) {
        var dialog;
        dialog = $mdDialog.confirm().title(options.title).textContent(options.body).ariaLabel('Confirm dialog.').targetEvent(options.event).ok('Okay').cancel('Cancel');
        return $mdDialog.show(dialog);
    };
}]);

angular.module('loopback-admin').provider('$mdColors', ["$mdColorPalette", function ($mdColorPalette) {
    var DARK_CONTRAST_COLOR, LIGHT_CONTRAST_COLOR, STRONG_LIGHT_CONTRAST_COLOR, addCustomStyle, clearStyleSheet, colorToRgbaArray, index, style, stylesheet;
    style = angular.element('<style></style>');
    document.head.appendChild(style[0]);
    stylesheet = style[0].sheet;
    index = 0;
    colorToRgbaArray = function (clr) {
        var blu, dig, grn, red;
        if (angular.isArray(clr) && clr.length === 3) {
            return clr;
        }
        if (/^rgb/.test(clr)) {
            return clr.replace(/(^\s*rgba?\(|\)\s*$)/g, '').split(',').map(function (value, i) {
                if (i === 3) {
                    return parseFloat(value, 10);
                } else {
                    return parseInt(value, 10);
                }
            });
        }
        if (clr.charAt(0) === '#') {
            clr = clr.substring(1);
        }
        if (!/^([a-fA-F0-9]{3}){1,2}$/g.test(clr)) {
            return;
        }
        dig = clr.length / 3;
        red = clr.substr(0, dig);
        grn = clr.substr(dig, dig);
        blu = clr.substr(dig * 2);
        if (dig === 1) {
            red += red;
            grn += grn;
            blu += blu;
        }
        return [parseInt(red, 16), parseInt(grn, 16), parseInt(blu, 16)];
    };
    DARK_CONTRAST_COLOR = colorToRgbaArray('rgba(0,0,0,0.87)');
    LIGHT_CONTRAST_COLOR = colorToRgbaArray('rgba(255,255,255,0.87');
    STRONG_LIGHT_CONTRAST_COLOR = colorToRgbaArray('rgb(255,255,255)');
    addCustomStyle = function (cssname, name, color, contrast) {
        if (contrast == null) {
            contrast = '';
        }
        if (contrast) {
            contrast = "color: " + contrast;
        }
        stylesheet.insertRule(".md-" + cssname + "-" + name + ".text { color: " + color + " !important }", index);
        stylesheet.insertRule(".md-" + cssname + "-" + name + ".background { background-color: " + color + "; " + contrast + " }", index + 1);
        index += 2;
    };
    clearStyleSheet = function () {
        var results;
        results = [];
        while (stylesheet.cssRules.length > 0) {
            results.push(stylesheet.deleteRule(0));
        }
        return results;
    };
    return {
        colorNames: [],
        colorStore: {},
        colorSelected: null,
        themeNames: [],
        themeStore: {},
        getContrastColor: function (palette) {
            var contrastDefaultColor, darkColors, lightColors, strongLightColors;
            contrastDefaultColor = palette.contrastDefaultColor, lightColors = palette.lightColors, strongLightColors = palette.strongLightColors, darkColors = palette.darkColors;
            if (angular.isString(lightColors)) {
                lightColors = lightColors.split(' ');
            }
            if (angular.isString(strongLightColors)) {
                strongLightColors = strongLightColors.split(' ');
            }
            if (angular.isString(darkColors)) {
                darkColors = darkColors.split(' ');
            }
            if (contrastDefaultColor === 'light') {
                if ((darkColors != null ? darkColors.indexOf(hueName) : void 0) > -1) {
                    return DARK_CONTRAST_COLOR;
                } else {
                    if ((strongLightColors != null ? strongLightColors.indexOf(hueName) : void 0) > -1) {
                        return STRONG_LIGHT_CONTRAST_COLOR;
                    } else {
                        return LIGHT_CONTRAST_COLOR;
                    }
                }
            } else {
                if ((lightColors != null ? lightColors.indexOf(hueName) : void 0) > -1) {
                    if ((strongLightColors != null ? strongLightColors.indexOf(hueName) : void 0) > -1) {
                        return STRONG_LIGHT_CONTRAST_COLOR;
                    } else {
                        return LIGHT_CONTRAST_COLOR;
                    }
                } else {
                    return DARK_CONTRAST_COLOR;
                }
            }
        },
        storeAndLoadPalettes: function (colors, themes, primaryPalette) {
            this.colorStore = colors;
            this.themeStore = themes;
            this.colorNames = Object.keys(colors);
            this.themeNames = Object.keys(themes);
            return this.loadPalette(primaryPalette);
        },
        loadPalette: function (newPalette) {
            var cleanedThemeName, color, group, groupName, name, ref, theme, themeName;
            if (this.colorSelected) {
                clearStyleSheet();
            }
            this.colorSelected = newPalette;
            ref = this.themeStore;
            for (themeName in ref) {
                theme = ref[themeName];
                cleanedThemeName = themeName === 'default' ? '' : themeName + '-';
                for (groupName in theme) {
                    group = theme[groupName];
                    for (name in group) {
                        color = group[name];
                        addCustomStyle(cleanedThemeName + groupName, name, color.value, color.contrast);
                    }
                }
            }
        },
        $get: function () {
            return {
                colorNames: this.colorNames,
                colorStore: this.colorStore,
                colorSelected: this.colorSelected,
                themeNames: this.themeNames,
                themeStore: this.themeStore,
                loadPalette: this.loadPalette
            };
        }
    };
}]).config(["$mdThemingProvider", "$mdColorsProvider", function ($mdThemingProvider, $mdColorsProvider) {
    var colorStore, palette, paletteName, parsePalette, parseTheme, primaryPalette, ref, themeStore;
    colorStore = {};
    parsePalette = function (paletteName, palette) {
        var addHue, colors, copyColors, hueColors, paletteContrast;
        paletteContrast = $mdThemingProvider._rgba($mdColorsProvider.getContrastColor(palette));
        hueColors = $mdThemingProvider._THEMES['default'].colors['primary'].hues;
        colors = {};
        addHue = function (hueName) {
            return colors[hueName] = {
                value: palette[hueColors[hueName]],
                contrast: paletteContrast
            };
        };
        copyColors = function (colorName, color) {
            if (/#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})\b/.test(palette[colorName])) {
                colors[colorName] = {
                    value: palette[colorName],
                    contrast: paletteContrast
                };
            }
        };
        colorStore[paletteName] = colors;
        Object.keys(palette).forEach(copyColors);
        Object.keys(hueColors).forEach(addHue);
    };
    ref = $mdThemingProvider._PALETTES;
    for (paletteName in ref) {
        palette = ref[paletteName];
        parsePalette(paletteName, palette);
    }
    themeStore = {};
    parseTheme = function (themeName) {
        var colors, defineColors, themeColorGroups;
        themeColorGroups = $mdThemingProvider._THEMES[themeName].colors;
        colors = {};
        defineColors = function (themeGroup) {
            var base, definedColors, item, ref1, value;
            if ((base = themeStore[themeName])[themeGroup] == null) {
                base[themeGroup] = {};
            }
            definedColors = colorStore[themeColorGroups[themeGroup].name];
            ref1 = themeColorGroups[themeGroup].hues;
            for (item in ref1) {
                value = ref1[item];
                themeStore[themeName][themeGroup][item] = definedColors[value];
            }
        };
        if (themeStore[themeName] == null) {
            themeStore[themeName] = {};
        }
        Object.keys(themeColorGroups).forEach(defineColors);
    };
    Object.keys($mdThemingProvider._THEMES).forEach(parseTheme);
    primaryPalette = $mdThemingProvider._THEMES['default'].colors.primary.name;
    $mdColorsProvider.storeAndLoadPalettes(colorStore, themeStore, primaryPalette);
}]);

'use strict';
angular.module('loopback-admin').factory('Flickr', ["$q", "$http", "LoopBackAdminConfiguration", function ($q, $http, LoopBackAdminConfiguration) {
    var baseUrl, flickrApiKey, params;
    flickrApiKey = LoopBackAdminConfiguration.options.flickrApiKey;
    baseUrl = 'https://api.flickr.com/services/rest/?';
    params = ['method=flickr.groups.pools.getPhotos', 'group_id=1463451@N25', 'safe_search=1', 'jsoncallback=JSON_CALLBACK', "api_key=" + flickrApiKey, 'format=json'].join('&');
    return {
        getBackgroundImage: function () {
            var defer;
            defer = $q.defer();
            if (flickrApiKey) {
                $http.get('http://freegeoip.net/json/').success(function (data) {
                    var latitude, longitude, optParams, region_name;
                    longitude = data.longitude, latitude = data.latitude, region_name = data.region_name;
                    optParams = "&tags=" + region_name + "&lat=" + latitude + "&lng=" + longitude + "&extras=url_l";
                    return $http.jsonp(baseUrl + params + optParams, {
                        cache: true
                    }).success(function (resp) {
                        var image, images, photos;
                        photos = resp.photos;
                        if (photos.photo.length) {
                            images = photos.photo;
                            image = images[Math.floor(Math.random() * images.length)];
                            return defer.resolve({
                                image: 'url(' + image.url_l + ')',
                                title: image.title
                            });
                        } else {
                            return defer.resolve();
                        }
                    });
                });
            } else {
                defer.resolve({
                    image: "url('./images/background.png')"
                });
            }
            return defer.promise;
        }
    };
}]);

'use strict';
angular.module('loopback-admin').factory('Model', ["$injector", "stringUtils", "$log", "Property", "PropertyTypeConfiguration", "LoopbackInjector", function ($injector, stringUtils, $log, Property, PropertyTypeConfiguration, LoopbackInjector) {
    var Model;
    return Model = (function () {
        function Model(name, model) {
            var key, value;
            this.name = name;
            this.label = stringUtils.camelCase(this.name);
            this.properties = [];
            this.propertyNames = [];
            this.relationNames = [];
            this.resource = LoopbackInjector(name);
            for (key in model) {
                value = model[key];
                if (key !== 'properties' && key !== 'relations') {
                    this[key] = value;
                }
            }
            this.constructProperties(model.properties);
            this.constructRelations(model.relations);
        }

        Model.prototype.constructRelations = function (modelRelations) {
            var _propertyTypes;
            _propertyTypes = PropertyTypeConfiguration;
            if (modelRelations) {
                Object.keys(modelRelations).forEach((function (_this) {
                    return function (relationName) {
                        var propertyConstructor, relation;
                        relation = modelRelations[relationName];
                        if (relation != null ? relation.foreignKey : void 0) {
                            _this.relationNames.push(relationName);
                        }
                        if (_propertyTypes[relation.type]) {
                            propertyConstructor = $injector.get(_propertyTypes[relation.type]);
                            return _this.properties.push(new propertyConstructor(relationName, relation));
                        } else {
                            return $log.warn('no such type defined for', relation.type, relation);
                        }
                    };
                })(this));
            }
        };

        Model.prototype.constructProperties = function (modelProperties) {
            var _propertyTypes;
            _propertyTypes = PropertyTypeConfiguration;
            if (modelProperties) {
                Object.keys(modelProperties).forEach((function (_this) {
                    return function (propertyName) {
                        var property, propertyConstructor;
                        property = modelProperties[propertyName];
                        if (Object.keys(property).length) {
                            if (property.id) {
                                _this.identifier = new Property(propertyName);
                            }
                            if (_propertyTypes[property.type.toLowerCase()]) {
                                _this.propertyNames.push(propertyName);
                                propertyConstructor = $injector.get(_propertyTypes[property.type.toLowerCase()]);
                                return _this.properties.push(new propertyConstructor(propertyName, property));
                            } else {
                                return $log.warn('no such type defined for', property.type, property);
                            }
                        }
                    };
                })(this));
            }
        };

        return Model;

    })();
}]);

'use strict';
angular.module('loopback-admin').provider('PropertyTypeConfiguration', ["$injector", function ($injector) {
    var propertyTypes;
    propertyTypes = {};
    return {
        registerPropertyType: function (type, PropertyType) {
            if (type === 'string' || type === 'objectid') {
                PropertyType = '';
            }
            return propertyTypes[type] = PropertyType + 'Property';
        },
        $get: function () {
            return propertyTypes;
        }
    };
}]).provider('PropertyViewConfiguration', ["PropertyTypeConfigurationProvider", "stringUtilsProvider", function (PropertyTypeConfigurationProvider, stringUtilsProvider) {
    var camelCase, propertyViews, registerPropertyType;
    camelCase = stringUtilsProvider.camelCase;
    registerPropertyType = PropertyTypeConfigurationProvider.registerPropertyType;
    propertyViews = {};
    return {
        registerAlias: function (alias, type) {
            if (propertyViews[type]) {
                propertyViews[alias] = propertyViews[type];
                return registerPropertyType(alias, camelCase(type));
            } else {
                return console.warn('no such type defined for', type, alias);
            }
        },
        registerPropertyView: function (type, PropertyView) {
            propertyViews[type] = PropertyView;
            registerPropertyType(type, camelCase(type));
        },
        $get: function () {
            return propertyViews;
        }
    };
}]).run(["$templateCache", "PropertyViewConfiguration", function ($templateCache, PropertyViewConfiguration) {
    return Object.keys(PropertyViewConfiguration).forEach(function (propertyName) {
        var propery;
        propery = PropertyViewConfiguration[propertyName];
        $templateCache.put(propertyName + '-column', propery.column);
        return $templateCache.put(propertyName + '-field', propery.field);
    });
}]);

'use strict';
angular.module('loopback-admin').directive('lbProperty', function () {
    return {
        restrict: 'E',
        scope: {
            property: '=',
            row: '=',
            model: '=',
            errorMessages: '=',
            form: '='
        },
        template: "<div id=\"row-{{ property.name }}\" ng-include=\"property.type + '-field'\"></div>"
    };
});

'use strict';
var hasProp = {}.hasOwnProperty;

angular.module('loopback-admin').factory('Property', ["stringUtils", function (stringUtils) {
    var Property;
    return Property = (function () {
        function Property(name, property) {
            var key, value;
            if (property == null) {
                property = {};
            }
            this["default"] = null;
            this.name = name || Math.random().toString(36).substring(7);
            this.label = stringUtils.camelCase(this.name);
            this.type = "string";
            this.validation = {
                required: false,
                minlength: 0,
                maxlength: 99999
            };
            for (key in property) {
                if (!hasProp.call(property, key)) continue;
                value = property[key];
                this[key] = value;
            }
            this.type = this.type.toLowerCase();
        }

        return Property;

    })();
}]);

'use strict';
angular.module('loopback-admin').config(["PropertyViewConfigurationProvider", function (PropertyViewConfigurationProvider) {
    var fvp;
    fvp = PropertyViewConfigurationProvider;
    return fvp.registerPropertyView('belongsTo', {
        column: null,
        field: '<lb-belongs-to-property form="form[property.name]" error-messages="errorMessages[property.name]" model="model" property="::property" value="row[property.name]"></lb-belongs-to-property>'
    });
}]);

'use strict';
angular.module('loopback-admin').directive('lbBelongsToProperty', function () {
    return {
        scope: {
            property: '=',
            value: '=',
            form: '=',
            errorMessages: '='
        },
        templateUrl: 'templates/property/belongs-to.tpl.html',
        restrict: 'E',
        link: function (scope, element) {
            var i, len, property, ref, resource, value;
            property = scope.property;
            scope.model = property.getModel();
            resource = scope.model.resource;
            scope.count = 0;
            scope.rows = [];
            ref = scope.value;
            for (i = 0, len = ref.length; i < len; i++) {
                value = ref[i];
                scope.rows.push(new resource(value));
                scope.count++;
            }
            scope.name = property.name;
            scope.v = property.validation;
        }
    };
});

'use strict';
var extend = function (child, parent) {
        for (var key in parent) {
            if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
            this.constructor = child;
        }

        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    },
    hasProp = {}.hasOwnProperty;

angular.module('loopback-admin').factory('BelongsToProperty', ["Property", "LoopBackAdminConfiguration", function (Property, LoopBackAdminConfiguration) {
    var BelongsToProperty;
    return BelongsToProperty = (function (superClass) {
        extend(BelongsToProperty, superClass);

        function BelongsToProperty(name, property) {
            BelongsToProperty.__super__.constructor.call(this, name, property);
            this.type = "belongsTo";
        }

        BelongsToProperty.prototype.getModel = function () {
            return LoopBackAdminConfiguration.getModel(this.model);
        };

        return BelongsToProperty;

    })(Property);
}]);

'use strict';
var extend = function (child, parent) {
        for (var key in parent) {
            if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
            this.constructor = child;
        }

        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    },
    hasProp = {}.hasOwnProperty;

angular.module('loopback-admin').config(["PropertyViewConfigurationProvider", function (PropertyViewConfigurationProvider) {
    var fvp;
    fvp = PropertyViewConfigurationProvider;
    return fvp.registerPropertyView('boolean', {
        column: '<lb-boolean-column value="row[property.name]"></lb-boolean-column>',
        field: '<lb-checkbox-property property="::property" value="row[property.name]"></lb-checkbox-property>'
    });
}]);

'use strict';

angular.module('loopback-admin').factory('BooleanProperty', ["ChoiceProperty", function (ChoiceProperty) {
    var BooleanProperty;
    return BooleanProperty = (function (superClass) {
        extend(BooleanProperty, superClass);

        function BooleanProperty(name, property) {
            BooleanProperty.__super__.constructor.call(this, name, property);
            this.type = "boolean";
            this.choices = [
                {
                    value: null,
                    label: 'undefined'
                }, {
                    value: true,
                    label: 'true'
                }, {
                    value: false,
                    label: 'false'
                }
            ];
        }

        return BooleanProperty;

    })(ChoiceProperty);
}]);

'use strict';
angular.module('loopback-admin').directive('lbCheckboxProperty', function () {
    return {
        scope: {
            property: '=',
            value: '='
        },
        restrict: 'E',
        templateUrl: 'templates/property/checkbox.tpl.html',
        link: function (scope, element) {
            var property;
            property = scope.property;
            scope.name = property.name;
            scope.v = property.validation;
            scope.value = !!scope.value;
        }
    };
});

'use strict';
angular.module('loopback-admin').config(["PropertyViewConfigurationProvider", function (PropertyViewConfigurationProvider) {
    var fvp;
    fvp = PropertyViewConfigurationProvider;
    return fvp.registerPropertyView('choice', {
        column: '<lb-string-column value="::property.getLabelForChoice(row[property.name], row)"></lb-string-column>',
        field: '<lb-choice-property property="::property" row="row" value="row[property.name]"></lb-choice-property>'
    });
}]);

'use strict';
angular.module('loopback-admin').directive('lbChoiceProperty', function () {
    return {
        scope: {
            property: '=',
            value: '=',
            row: '=?'
        },
        restrict: 'E',
        templateUrl: 'templates/property/choice.tpl.html',
        compile: function () {
            return {
                pre: function (scope, element) {
                    var choices, property;
                    property = scope.property;
                    scope.name = property.name;
                    scope.v = property.validation;
                    scope.$watch('value', function (newValue, oldValue) {
                        if (newValue !== oldValue && newValue === void 0) {
                            scope.value = null;
                        }
                    });
                    choices = property.choices ? property.choices : [];
                    scope.choices = typeof choices === 'function' ? choices(scope.row) : choices;
                },
                post: function (scope) {
                    var listener, updateChoices;
                    updateChoices = function (choices) {
                        scope.choices = choices;
                        return scope.$root.$$phase || scope.$digest();
                    };
                    listener = scope.$on('choices:update', function (e, data) {
                        return updateChoices(data.choices);
                    });
                    scope.$on('$destroy', function () {
                        return listener();
                    });
                }
            };
        }
    };
});

'use strict';
var extend = function (child, parent) {
        for (var key in parent) {
            if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
            this.constructor = child;
        }

        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    },
    hasProp = {}.hasOwnProperty;

angular.module('loopback-admin').factory('ChoiceProperty', ["Property", function (Property) {
    var ChoiceProperty;
    return ChoiceProperty = (function (superClass) {
        extend(ChoiceProperty, superClass);

        function ChoiceProperty(name, property) {
            ChoiceProperty.__super__.constructor.call(this, name, property);
            this.type = "choice";
            this.choices = [];
            return;
        }

        ChoiceProperty.prototype.getLabelForChoice = function (value, row) {
            var choice, choices;
            choices = typeof this.choices === 'function' ? this.choices(row) : this.choices;
            choice = choices.filter(function (c) {
                return c.value === value;
            }).pop();
            if (choice) {
                return choice.label;
            } else {
                return null;
            }
        };

        return ChoiceProperty;

    })(Property);
}]);

'use strict';
angular.module('loopback-admin').directive('uiSelectRequired', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$validators.uiSelectRequired = function (modelValue, viewValue) {
                var determineVal;
                if (angular.isArray(modelValue)) {
                    determineVal = modelValue;
                } else if (angular.isArray(viewValue)) {
                    determineVal = viewValue;
                } else {
                    return false;
                }
                return determineVal.length > 0;
            };
        }
    };
});

'use strict';
angular.module('loopback-admin').config(["PropertyViewConfigurationProvider", function (PropertyViewConfigurationProvider) {
    var fvp;
    fvp = PropertyViewConfigurationProvider;
    fvp.registerPropertyView('choices', {
        column: '<lb-choices-column values="row[property.name]"></lb-choices-column>',
        field: '<lb-choices-property property="::property" row="row" value="row[property.name]"></lb-choices-property>'
    });
    return fvp.registerAlias('array', 'choices');
}]);

'use strict';
angular.module('loopback-admin').directive('lbChoicesProperty', ["$compile", "$templateCache", function ($compile, $templateCache) {
    return {
        scope: {
            property: '=',
            value: '=',
            row: '=?'
        },
        restrict: 'E',
        templateUrl: 'templates/property/choices.tpl.html',
        compile: function () {
            return {
                pre: function (scope, element) {
                    var choices, property;
                    property = scope.property;
                    scope.name = property.name;
                    scope.v = property.validation;
                    choices = property.choices ? property.choices : [];
                    return scope.choices = typeof choices === 'function' ? choices(scope.row) : choices;
                },
                post: function (scope) {
                    var listener;
                    listener = scope.$on('choices:update', function (e, data) {
                        scope.scope.choices = data.choices;
                        return scope.$root.$$phase || scope.$digest();
                    });
                    scope.$on('$destroy', function () {
                        return listener();
                    });
                }
            };
        }
    };
}]);

'use strict';
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

angular.module('loopback-admin').factory('ChoicesProperty', ["ChoiceProperty", function(ChoiceProperty) {
  var ChoicesProperty;
  return ChoicesProperty = (function(superClass) {
    extend(ChoicesProperty, superClass);

    function ChoicesProperty(name, property) {
      ChoicesProperty.__super__.constructor.call(this, name, property);
      this.type = "choices";
    }

    return ChoicesProperty;

  })(ChoiceProperty);
}]);
'use strict';
angular.module('loopback-admin').config(["PropertyViewConfigurationProvider", function (PropertyViewConfigurationProvider) {
    var fvp;
    fvp = PropertyViewConfigurationProvider;
    return fvp.registerPropertyView('date', {
        column: '<lb-date-column property="::property" value="row[property.name]"></lb-date-column>',
        field: '<lb-date-property property="::property" value="row[property.name]"></lb-date-property>'
    });
}]);

'use strict';
angular.module('loopback-admin').directive('lbDateProperty', function () {
    return {
        scope: {
            property: '=',
            value: '='
        },
        restrict: 'E',
        templateUrl: 'templates/property/date.tpl.html',
        link: function (scope, element) {
            var property;
            property = scope.property;
            scope.name = property.name;
            scope.rawValue = scope.value;
            scope.$watch('rawValue', function (rawValue) {
                scope.value = property.parse(rawValue);
            });
            scope.v = property.validation;
        }
    };
});

'use strict';
var extend = function (child, parent) {
        for (var key in parent) {
            if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
            this.constructor = child;
        }

        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    },
    hasProp = {}.hasOwnProperty;

angular.module('loopback-admin').factory('DateProperty', ["Property", function (Property) {
    var DateProperty;
    return DateProperty = (function (superClass) {
        extend(DateProperty, superClass);

        function DateProperty(name, property) {
            DateProperty.__super__.constructor.call(this, name, property);
            this.format = null;
            this.parse = function (date) {
                if (date == null) {
                    date = null;
                }
                if (date instanceof Date) {
                    return date;
                } else if (angular.isString(date)) {
                    return new Date(date);
                } else {
                    return null;
                }
            };
            this.type = "date";
            return;
        }

        return DateProperty;

    })(Property);
}]).factory('DateTimeProperty', ["DateProperty", function (DateProperty) {
    var DateTimeProperty;
    return DateTimeProperty = (function (superClass) {
        extend(DateTimeProperty, superClass);

        function DateTimeProperty(name, property) {
            DateTimeProperty.__super__.constructor.call(this, name, property);
            this.format = null;
            this.parse = function (date) {
                return date;
            };
            this.type = 'datetime';
        }

        return DateTimeProperty;

    })(DateProperty);
}]);

'use strict';
angular.module('loopback-admin').config(["PropertyViewConfigurationProvider", function (PropertyViewConfigurationProvider) {
    var fvp;
    fvp = PropertyViewConfigurationProvider;
    return fvp.registerPropertyView('float', {
        column: '<lb-number-column property="::property" value="row[property.name]"></lb-number-column>',
        field: '<lb-input-property type="number" property="::property" value="row[property.name]"></lb-input-property>'
    });
}]);

'use strict';
var extend = function (child, parent) {
        for (var key in parent) {
            if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
            this.constructor = child;
        }

        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    },
    hasProp = {}.hasOwnProperty;

angular.module('loopback-admin').factory('FloatProperty', ["NumberProperty", function (NumberProperty) {
    var FloatProperty;
    return FloatProperty = (function (superClass) {
        extend(FloatProperty, superClass);

        function FloatProperty(name, property) {
            FloatProperty.__super__.constructor.call(this, name, property);
            this.type = 'float';
            this.format = '0.000';
        }

        return FloatProperty;

    })(NumberProperty);
}]);

'use strict';
angular.module('loopback-admin').config(["PropertyViewConfigurationProvider", function (PropertyViewConfigurationProvider) {
    var fvp;
    fvp = PropertyViewConfigurationProvider;
    return fvp.registerPropertyView('hasMany', {
        column: '',
        field: '<lb-has-many-property form="form[property.name]" error-messages="errorMessages[property.name]" model="model" property="::property" value="row[property.name]"></lb-has-many-property>'
    });
}]);

'use strict';
angular.module('loopback-admin').directive('lbHasManyProperty', function () {
    return {
        scope: {
            property: '=',
            value: '=',
            form: '=',
            errorMessages: '='
        },
        templateUrl: 'templates/property/has-many.tpl.html',
        restrict: 'E',
        link: function (scope, element) {
            var i, len, property, ref, resource, value;
            property = scope.property;
            scope.model = property.getModel();
            resource = scope.model.resource;
            scope.count = 0;
            scope.rows = [];
            ref = scope.value;
            for (i = 0, len = ref.length; i < len; i++) {
                value = ref[i];
                scope.rows.push(new resource(value));
                scope.count++;
            }
            scope.name = property.name;
            scope.v = property.validation;
        }
    };
});

'use strict';
var extend = function (child, parent) {
        for (var key in parent) {
            if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
            this.constructor = child;
        }

        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    },
    hasProp = {}.hasOwnProperty;

angular.module('loopback-admin').factory('HasManyProperty', ["Property", "LoopBackAdminConfiguration", function (Property, LoopBackAdminConfiguration) {
    var HasManyProperty;
    return HasManyProperty = (function (superClass) {
        extend(HasManyProperty, superClass);

        function HasManyProperty(name, property) {
            HasManyProperty.__super__.constructor.call(this, name, property);
            this.type = "hasMany";
        }

        HasManyProperty.prototype.getModel = function () {
            return LoopBackAdminConfiguration.getModel(this.model);
        };

        return HasManyProperty;

    })(Property);
}]);

'use strict';
angular.module('loopback-admin').config(["PropertyViewConfigurationProvider", function (PropertyViewConfigurationProvider) {
    var fvp;
    fvp = PropertyViewConfigurationProvider;
    fvp.registerPropertyView('string', {
        column: '<lb-string-column value="row[property.name]"></lb-string-column>',
        field: '<lb-input-property form="form[property.name]" error-messages="errorMessages[property.name]" property="::property" value="row[property.name]"></lb-input-property>'
    });
    return fvp.registerAlias('objectid', 'string');
}]);

'use strict';
angular.module('loopback-admin').directive('lbInputProperty', function () {
    return {
        scope: {
            property: '=',
            value: '=',
            form: '=',
            errorMessages: '='
        },
        templateUrl: 'templates/property/input.tpl.html',
        restrict: 'E',
        link: function (scope, element) {
            var property;
            property = scope.property;
            scope.name = property.name;
            scope.v = property.validation;
        }
    };
});

'use strict';
angular.module('loopback-admin').config(["PropertyViewConfigurationProvider", function (PropertyViewConfigurationProvider) {
    var fvp;
    fvp = PropertyViewConfigurationProvider;
    return fvp.registerPropertyView('number', {
        column: '<lb-number-column property="::property" value="row[property.name]"></lb-number-column>',
        field: '<lb-input-property type="number" property="::property" value="row[property.name]"></lb-input-property>'
    });
}]);

'use strict';
var extend = function (child, parent) {
        for (var key in parent) {
            if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
            this.constructor = child;
        }

        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    },
    hasProp = {}.hasOwnProperty;

angular.module('loopback-admin').factory('NumberProperty', ["Property", function (Property) {
    var NumberProperty;
    return NumberProperty = (function (superClass) {
        extend(NumberProperty, superClass);

        function NumberProperty(name, property) {
            NumberProperty.__super__.constructor.call(this, name, property);
            this.type = "number";
            this.format = void 0;
        }

        return NumberProperty;

    })(Property);
}]);

'use strict';
angular.module('loopback-admin').config(["$stateProvider", function ($stateProvider) {
    return $stateProvider.state('app', {
        abstract: true,
        template: '<div ui-view></div>',
        resolve: {
            user: ["LoopBackAdminConfiguration", function (LoopBackAdminConfiguration) {
                var User;
                User = LoopBackAdminConfiguration.userModel;
                return User.getCurrent().$promise;
            }],
            config: ["user", "LoopBackAdminConfiguration", function (user, LoopBackAdminConfiguration) {
                return LoopBackAdminConfiguration.initialize();
            }]
        }
    }).state('browser', {
        parent: 'app',
        abstract: true,
        controller: 'BrowserController',
        controllerAs: 'browserController',
        templateUrl: "templates/routing/browser.tpl.html",
        resolve: {
            config: ["LoopBackAdminConfiguration", function (LoopBackAdminConfiguration) {
                return LoopBackAdminConfiguration.initialize();
            }]
        }
    });
}]);

'use strict';
angular.module('loopback-admin').controller('BrowserController', ["$scope", "$state", "LoopBackAdminConfiguration", function ($scope, $state, LoopBackAdminConfiguration) {
    var application, vm;
    vm = this;
    application = LoopBackAdminConfiguration;
    vm.menu = application.menu;
}]);

'use strict';
angular.module('loopback-admin').config(["$stateProvider", function ($stateProvider) {
    return $stateProvider.state('dashboard', {
        parent: 'browser',
        url: '/dashboard',
        controller: 'DashboardController',
        controllerAs: 'dashboardController',
        templateUrl: "templates/routing/dashboard.tpl.html",
        resolve: {
            models: ["config", function (config) {
                return config.getModels();
            }]
        }
    });
}]);

'use strict';
angular.module('loopback-admin').controller('DashboardController', ["models", function (models) {
    var vm;
    vm = this;
    vm.models = models;
}]);

'use strict';
angular.module('loopback-admin').config(["$stateProvider", function ($stateProvider) {
    return $stateProvider.state('error', {
        parent: 'app',
        templateUrl: 'templates/routing/error.tpl.html',
        onEnter: ["config", "$log", "$state", function (config, $log, $state) {
            return $log.error(config, $state);
        }]
    });
}]);

'use strict';
angular.module('loopback-admin').config(["$stateProvider", function ($stateProvider) {
    return $stateProvider.state('landing', {
        url: '/landing',
        templateUrl: "templates/routing/landing-page.tpl.html",
        controller: 'LandingPageController',
        controllerAs: 'landing',
        resolve: {
            background: ["Flickr", function (Flickr) {
                return Flickr.getBackgroundImage();
            }]
        }
    });
}]);

'use strict';
angular.module('loopback-admin').controller('LandingPageController', ["background", function (background) {
    var vm;
    vm = this;
    vm.background = background;
}]);

'use strict';
angular.module('loopback-admin').config(["$stateProvider", function ($stateProvider) {
    $stateProvider.state('list', {
        url: '/:model/list',
        parent: 'browser',
        controller: 'ListController',
        controllerAs: 'listController',
        templateUrl: 'templates/routing/list.tpl.html',
        resolve: {
            model: ["config", "$stateParams", function (config, $stateParams) {
                return config.getModel($stateParams.model);
            }]
        }
    });
}]);

'use strict';
angular.module('loopback-admin').controller('ListController', ["model", function (model) {
    var vm;
    vm = this;
    vm.model = model;
}]);

'use strict';
angular.module('loopback-admin').config(["$stateProvider", function ($stateProvider) {
    return $stateProvider.state('login', {
        url: '/login',
        views: {
            '': {
                templateUrl: "templates/routing/register-login.tpl.html",
                controller: ["$scope", function ($scope) {
                    return $scope.pageTitle = 'Login';
                }]
            },
            'content@login': {
                templateUrl: "templates/routing/login.tpl.html",
                controller: 'loginController',
                controllerAs: 'loginController'
            }
        }
    });
}]);

'use strict';
angular.module('loopback-admin').controller('loginController', ["$state", "$rootScope", "LoopBackAdminConfiguration", "$scope", "$mdDialog", function ($state, $rootScope, LoopBackAdminConfiguration, $scope, $mdDialog) {
    var User, vm;
    vm = this;
    User = LoopBackAdminConfiguration.userModel;
    vm.userLoginField = LoopBackAdminConfiguration.userLoginField;
    vm.login = function (credentials) {
        var request;
        request = User.login(credentials);
        return request.$promise.then(function (data) {
            if (data.user.role === 'admin') {
                $state.go('dashboard');
            } else {
                User.logout();
            }
        })["catch"](function (err) {
            vm.error = err;
        });
    };
    vm.showPasswordResetModal = function ($event) {
        $mdDialog.show({
            templateUrl: 'templates/modals/reset-password.html',
            targetEvent: $event,
            controller: 'ResetPasswordCtrl',
            controllerAs: 'resetPassword',
            clickOutsideToClose: true
        });
    };
}]).controller('ResetPasswordCtrl', ["$mdDialog", "LoopBackAdminConfiguration", function ($mdDialog, LoopBackAdminConfiguration) {
    var User, vm;
    vm = this;
    User = LoopBackAdminConfiguration.userModel;
    vm.resetPasswordError = '';
    vm.closePasswordResetModal = function () {
        vm.resetPasswordError = '';
        vm.passResetCredentials = {};
        $mdDialog.hide();
    };
    vm.resetPassword = function (passResetCredentials) {
        User.resetPassword(passResetCredentials).$promise.then(function (data) {
            $rootScope.showToast(data);
            return vm.closePasswordResetModal();
        })["catch"](function (data) {
            vm.resetPasswordError = data.email || data;
        });
    };
}]);

'use strict';
angular.module('loopback-admin').config(["$stateProvider", function ($stateProvider) {
    return $stateProvider.state('logout', {
        url: '/logout',
        controller: 'logoutController',
        controllerAs: 'logoutController'
    });
}]);

'use strict';
angular.module('loopback-admin').controller('logoutController', ["$location", "$rootScope", "LoopBackAdminConfiguration", function ($location, $rootScope, LoopBackAdminConfiguration) {
    var User;
    User = LoopBackAdminConfiguration.userModel;
    User.logout();
    $location.path('/login');
}]);

'use strict';
angular.module('loopback-admin').config(["$stateProvider", function ($stateProvider) {
    return $stateProvider.state('register', {
        url: '/register',
        controller: 'registerController',
        controllerAs: 'registerController',
        views: {
            '': {
                templateUrl: "templates/routing/register-login.tpl.html",
                controller: ["$scope", function ($scope) {
                    return $scope.pageTitle = 'Register';
                }]
            },
            'content@register': {
                templateUrl: "templates/routing/register.tpl.html"
            }
        }
    });
}]);

'use strict';
angular.module('loopback-admin').controller('registerController', ["$state", "LoopBackAdminConfiguration", function ($state, LoopBackAdminConfiguration) {
    var User, vm;
    vm = this;
    User = LoopBackAdminConfiguration.userModel;
    vm.login = function () {
        var request;
        request = User.login(vm.data);
        return request.$promise.then(function (data) {
            $state.go('dashboard');
        })["catch"](function (err) {
            vm.error = err;
        });
    };
}]);

'use strict';
angular.module('loopback-admin').directive('lbBooleanColumn', function () {
    return {
        restrict: 'E',
        scope: {
            value: '='
        },
        templateUrl: 'templates/table/column/boolean.tpl.html',
        link: function (scope) {
            scope.isOk = !!scope.value;
        }
    };
});
'use strict';
angular.module('loopback-admin').directive('lbChoicesColumn', function () {
    return {
        restrict: 'E',
        scope: {
            values: '='
        },
        templateUrl: 'templates/table/column/choices.tpl.html'
    };
});
'use strict';
angular.module('loopback-admin').directive('lbColumn', function () {
    return {
        restrict: 'E',
        scope: {
            property: '=',
            row: '=',
            model: '=',
            rows: '='
        },
        template: "<span ng-include=\"property.type + '-column'\"></span>"
    };
});
'use strict';
angular.module('loopback-admin').directive('lbDateColumn', function () {
    return {
        restrict: 'E',
        scope: {
            value: '=',
            property: '='
        },
        templateUrl: 'templates/table/column/date.tpl.html',
        link: function (scope) {
            var property;
            property = scope.property;
            scope.format = property.format;
            if (!scope.format) {
                scope.format = property.type === 'date' ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm:ss';
            }
        }
    };
});
'use strict';
angular.module('loopback-admin').directive('lbNumberColumn', function () {
    return {
        restrict: 'E',
        scope: {
            value: '=',
            property: '='
        },
        templateUrl: 'templates/table/column/number.tpl.html'
    };
});
'use strict';
angular.module('loopback-admin').directive('lbStringColumn', function () {
    return {
        restrict: 'E',
        scope: {
            value: '='
        },
        templateUrl: 'templates/table/column/string.tpl.html'
    };
});

'use strict';
angular.module('loopback-admin').controller('TableCtrl', ["$mdDialog", "$rootScope", "$log", function ($mdDialog, $rootScope, $log) {
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
}]);
'use strict';
angular.module('loopback-admin').directive('cmsTable', function () {
    return {
        bindToController: {
            properties: '=',
            columnLimit: '=',
            model: '=',
            template: '@'
        },
        controller: 'TableCtrl',
        controllerAs: 'table',
        scope: {},
        templateUrl: 'templates/table/table.tpl.html'
    };
});
'use strict';
angular.module('loopback-admin').controller('RowDataModel', ["$mdDialog", "$rootScope", "type", "row", "rows", "model", function ($mdDialog, $rootScope, type, row, rows, model) {
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
}]);