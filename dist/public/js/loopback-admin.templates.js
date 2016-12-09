angular.module('loopback-admin.theme', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/common/current-user.html',
    "<div class=\"current-user\">\n" +
    "    <div ui-sref=\"dashboard\" class=\"avatar\">\n" +
    "        <img class=\"img-responsive\" ng-src=\"{{ :: $root.getAvatar(ctrl.auth.currentUserData) }}\"/>\n" +
    "    </div>\n" +
    "\n" +
    "    <md-menu>\n" +
    "      <md-button aria-label=\"Open user menu\" class=\"md-primary\" ng-click=\"ctrl.openMenu($mdOpenMenu, $event)\">\n" +
    "        {{ :: ctrl.auth.currentUserData.username }}\n" +
    "      </md-button>\n" +
    "\n" +
    "      <md-menu-content width=\"4\">\n" +
    "\n" +
    "        <md-menu-item>\n" +
    "          <md-button ng-click=\"ctrl.showAccountSettingsModal($event, 'username')\">\n" +
    "            <md-icon md-font-set=\"material-icons\">sort</md-icon>\n" +
    "            {{:: 'editUsername' | text }}\n" +
    "          </md-button>\n" +
    "        </md-menu-item>\n" +
    "\n" +
    "        <md-menu-item>\n" +
    "          <md-button ng-click=\"ctrl.showAccountSettingsModal($event, 'avatar')\">\n" +
    "            <md-icon md-font-set=\"material-icons\">sort</md-icon>\n" +
    "            {{:: 'changeAvatar' | text }}\n" +
    "          </md-button>\n" +
    "        </md-menu-item>\n" +
    "\n" +
    "        <md-menu-divider></md-menu-divider>\n" +
    "\n" +
    "        <md-menu-item>\n" +
    "          <md-button ng-click=\"ctrl.showAccountSettingsModal($event)\">\n" +
    "            <md-icon md-font-set=\"material-icons\">sort</md-icon>\n" +
    "            {{:: 'accountSettings' | text }}\n" +
    "          </md-button>\n" +
    "        </md-menu-item>\n" +
    "\n" +
    "        <md-menu-item>\n" +
    "          <md-button ui-sref=\"logout\">\n" +
    "            <md-icon md-font-set=\"material-icons\">sort</md-icon>\n" +
    "            {{:: 'logOut' | text }}\n" +
    "          </md-button>\n" +
    "        </md-menu-item>\n" +
    "\n" +
    "      </md-menu-content>\n" +
    "    </md-menu>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('templates/common/social-buttons.tpl.html',
    "<div md-ink-ripple ng-click=\"social.loginWith('facebook')\" class=\"social-icon facebook\">\n" +
    "    <md-tooltip>{{:: 'loginWithFacebook' | text }}</md-tooltip>\n" +
    "</div>\n" +
    "\n" +
    "<div md-ink-ripple ng-click=\"social.loginWith('google')\" class=\"social-icon googleplus\">\n" +
    "    <md-tooltip>{{:: 'loginWithGoogle' | text }}</md-tooltip>\n" +
    "</div>\n" +
    "\n" +
    "<div md-ink-ripple ng-click=\"social.loginWith('twitter')\" class=\"social-icon twitter\">\n" +
    "    <md-tooltip>{{:: 'loginWithTwitter' | text }}</md-tooltip>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/common/toolbar.html',
    "<md-toolbar class=\"md-primary-hue-2 background\">\n" +
    "    <div class=\"md-toolbar-tools\">\n" +
    "      <md-button class=\"md-icon-button\" ng-click=\"toggleSidenav('left')\" hide-gt-md aria-label=\"{{ 'Dashboard' }}\">\n" +
    "        <md-icon md-font-set=\"material-icons\">{{ 'menu' }}</md-icon>\n" +
    "      </md-button>\n" +
    "\n" +
    "      <h3>\n" +
    "        {{ title }}\n" +
    "      </h3>\n" +
    "    </div>\n" +
    "</md-toolbar>"
  );


  $templateCache.put('templates/modals/account-settings.html',
    "<md-dialog class=\"md-modal md-modal-wide account-settings-modal\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"md-modal-header md-primary-hue-2 background\">\r" +
    "\n" +
    "        <div class=\"md-modal-avatar\">\r" +
    "\n" +
    "            <img class=\"img-responsive\" ng-src=\"{{ $root.getAvatar(modal.auth.currentUserData) }}\"/>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"name\">{{:: modal.auth.currentUserData.username }}</div>\r" +
    "\n" +
    "        <div class=\"email\">{{:: modal.auth.currentUserData.email }}</div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"md-modal-nav md-primary-default background\">\r" +
    "\n" +
    "        <div ng-click=\"modal.activeTab = 'settings'\" class=\"{{ modal.activeTab === 'settings' ? 'md-background-default' : 'md-primary-default' }} background md-modal-nav-item\">\r" +
    "\n" +
    "            <md-icon class=\"{{ modal.activeTab === 'settings' ? 'md-primary-default' : 'md-background-default' }} text material-icons\" md-font-set=\"material-icons\">settings</md-icon>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div ng-click=\"modal.activeTab = 'avatar'\" class=\"{{ modal.activeTab === 'avatar' ? 'md-background-default' : 'md-primary-default' }} background md-modal-nav-item\">\r" +
    "\n" +
    "            <md-icon class=\"{{ modal.activeTab === 'avatar' ? 'md-primary-default' : 'md-background-default' }} text material-icons\" md-font-set=\"material-icons\">face</md-icon>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div ng-click=\"modal.activeTab = 'password'\" class=\"{{ modal.activeTab === 'password' ? 'md-background-default' : 'md-primary-default' }} background md-modal-nav-item\">\r" +
    "\n" +
    "            <md-icon class=\"{{ modal.activeTab === 'password' ? 'md-primary-default' : 'md-background-default' }} text material-icons\" md-font-set=\"material-icons\">lock</md-icon>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"md-modal-tab\" ng-class=\"{ open: modal.activeTab === 'settings' }\">\r" +
    "\n" +
    "        <md-input-container>\r" +
    "\n" +
    "            <label>{{:: 'username' | text }}</label>\r" +
    "\n" +
    "            <input class=\"username\" type=\"text\" ng-model=\"modal.auth.currentUserData.username\">\r" +
    "\n" +
    "        </md-input-container>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <md-input-container>\r" +
    "\n" +
    "            <label>{{:: 'firstName' | text }}</label>\r" +
    "\n" +
    "            <input type=\"text\" ng-model=\"modal.auth.currentUserData.first_name\">\r" +
    "\n" +
    "        </md-input-container>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <md-input-container>\r" +
    "\n" +
    "            <label>{{:: 'lastName' | text }}</label>\r" +
    "\n" +
    "            <input type=\"text\" ng-model=\"modal.auth.currentUserData.last_name\">\r" +
    "\n" +
    "        </md-input-container>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"buttons\">\r" +
    "\n" +
    "            <md-button ng-click=\"$root.closeModal()\">{{:: 'cancel' | text }}</md-button>\r" +
    "\n" +
    "            <md-button ng-click=\"modal.updateAccountSettings()\" class=\"md-raised md-primary\">{{:: 'confirm' | text }}</md-button>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"md-modal-tab\" ng-class=\"{ open: modal.activeTab === 'password' }\">\r" +
    "\n" +
    "        <form layout=\"column\" ng-submit=\"modal.changePassword(changePasswordModel)\">\r" +
    "\n" +
    "            <md-input-container layout=\"column\">\r" +
    "\n" +
    "                <label>{{:: 'currentPassword' | text }}</label>\r" +
    "\n" +
    "                <input type=\"password\" ng-model=\"changePasswordModel.oldPassword\">\r" +
    "\n" +
    "            </md-input-container>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <md-input-container layout=\"column\">\r" +
    "\n" +
    "                <label>{{:: 'newPassword' | text }}</label>\r" +
    "\n" +
    "                <input type=\"password\" ng-model=\"changePasswordModel.newPassword\">\r" +
    "\n" +
    "            </md-input-container>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <md-input-container layout=\"column\">\r" +
    "\n" +
    "                <label>{{:: 'confirmPassword' | text }}</label>\r" +
    "\n" +
    "                <input type=\"password\" ng-model=\"changePasswordModel.newPassword_confirmation\">\r" +
    "\n" +
    "            </md-input-container>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div class=\"buttons\">\r" +
    "\n" +
    "                <md-button ng-click=\"$root.closeModal()\">{{:: 'cancel' | text }}</md-button>\r" +
    "\n" +
    "                <md-button type=\"submit\" class=\"md-raised md-primary\">{{:: 'change' | text }}</md-button>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"md-modal-tab avatar-tab\" ng-class=\"{ open: modal.activeTab === 'avatar' }\">\r" +
    "\n" +
    "        <img class=\"img-responsive\" ng-src=\"{{ $root.getAvatar(modal.auth.currentUserData) }}\"/>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <p>{{:: 'avatarAcceptedFormats' | text }}</p>\r" +
    "\n" +
    "        <p>{{:: 'avatarResizeExpl' | text }}</p>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"buttons\">\r" +
    "\n" +
    "            <md-button ng-click=\"$root.closeModal()\">{{:: 'cancel' | text }}</md-button>\r" +
    "\n" +
    "            <md-button ng-click=\"modal.removeAvatar()\">{{:: 'remove' | text }}</md-button>\r" +
    "\n" +
    "            <md-button ng-file-select ng-file-change=\"modal.upload($files)\" accept=\"image/*\" ngf-accept=\"'.png,.jpg'\" class=\"md-raised md-primary\">\r" +
    "\n" +
    "                <i class=\"icon icon-upload-cloud\"></i>\r" +
    "\n" +
    "                {{:: 'upload' | text }}\r" +
    "\n" +
    "            </md-button>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</md-dialog>"
  );


  $templateCache.put('templates/modals/request-email.html',
    "<md-dialog class=\"md-modal md-modal-wide request-email-modal\">\n" +
    "    <md-dialog-content>\n" +
    "        <div class=\"md-dialog-content\">\n" +
    "            <div class=\"md-modal-header\">\n" +
    "                <h1>{{:: 'enterYourTwitterEmail' | text }}</h1>\n" +
    "            </div>\n" +
    "\n" +
    "            <md-input-container>\n" +
    "                <label>{{:: 'email' | text }}</label>\n" +
    "                <input type=\"email\" ng-model=\"credentials.email\">\n" +
    "            </md-input-container>\n" +
    "\n" +
    "            <div class=\"buttons\">\n" +
    "                <md-button ng-click=\"$root.closeModal()\">{{:: 'cancel' | text }}</md-button>\n" +
    "                <md-button ng-click=\"createAndLoginUser()\" ng-disabled=\"!credentials.email\" class=\"md-primary md-raised\">{{:: 'login' | text }}</md-button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </md-dialog-content>\n" +
    "</md-dialog>"
  );


  $templateCache.put('templates/modals/request-password.html',
    "<md-dialog class=\"md-modal md-modal-wide limit-width request-password-modal\">\n" +
    "    <md-dialog-content>\n" +
    "        <div class=\"md-dialog-content\">\n" +
    "            <div class=\"md-modal-header\">\n" +
    "                <h1>{{:: 'enterYourPassword' | text }}</h1>\n" +
    "            </dv>\n" +
    "\n" +
    "            <div class=\"sub-header\">{{:: 'requestPassword' | text }}</div>\n" +
    "\n" +
    "            <md-input-container>\n" +
    "                <label>{{:: 'password' | text }}</label>\n" +
    "                <input type=\"password\" ng-model=\"credentials.password\">\n" +
    "                <div ng-if=\"errorMessage\" class=\"md-modal-error\" style=\"order: 2\">{{ errorMessage }}</div>\n" +
    "            </md-input-container>\n" +
    "\n" +
    "            <div class=\"buttons\">\n" +
    "                <md-button ng-click=\"$root.closeModal()\">{{:: 'cancel' | text }}</md-button>\n" +
    "                <md-button ng-click=\"connectAccounts()\" ng-disabled=\"!credentials.password\" class=\"md-primary md-raised\">{{:: 'connect' | text }}</md-button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </md-dialog-content>\n" +
    "</md-dialog>"
  );


  $templateCache.put('templates/modals/reset-password.html',
    "<md-dialog class=\"md-modal md-modal-wide password-reset-modal\">\n" +
    "    <md-dialog-content>\n" +
    "        <div class=\"md-dialog-content\">\n" +
    "            <div class=\"md-modal-header\">\n" +
    "                <h1>{{:: 'passwordRecovery' | text }}</h1>\n" +
    "            </div>\n" +
    "\n" +
    "            <md-input-container>\n" +
    "                <label>{{:: 'email' | text }}</label>\n" +
    "                <input type=\"email\" ng-model=\"resetPassword.credentials.email\">\n" +
    "                <div class=\"md-modal-error\">{{ resetPassword.Error }}</div>\n" +
    "                <div class=\"md-modal-info\" ng-if=\"!resetPassword.Error\">{{:: 'passResetExpl' | text }}</div>\n" +
    "            </md-input-container>\n" +
    "\n" +
    "            <div class=\"buttons\">\n" +
    "                <md-button ng-click=\"$root.closeModal()\">{{:: 'cancel' | text }}</md-button>\n" +
    "                <md-button ng-click=\"resetPassword.submit(resetPassword.credentials)\" ng-disabled=\"!resetPassword.credentials.email\" class=\"md-primary md-raised\">{{:: 'sendEmail' | text }}</md-button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </md-dialog-content>\n" +
    "</md-dialog>"
  );


  $templateCache.put('templates/modals/table.tpl.html',
    "<md-dialog class=\"md-modal md-modal-wide user-modal\">\n" +
    "    <form ng-submit=\"modal.submit(modal.row)\" name=\"::modal.form\">\n" +
    "        <md-toolbar>\n" +
    "          <div class=\"md-toolbar-tools\">\n" +
    "            <h2>{{ (modal.type | text) + ' ' + (modal.model.name | modelToHuman) + ' #' + modal.row[modal.model.identifier.name] }}</h2>\n" +
    "\n" +
    "            <span flex></span>\n" +
    "\n" +
    "            <md-button class=\"md-icon-button\" ng-click=\"$root.closeModal()\">\n" +
    "              <md-icon aria-label=\"Close dialog\">close</md-icon>\n" +
    "            </md-button>\n" +
    "          </div>\n" +
    "        </md-toolbar>\n" +
    "\n" +
    "        <md-dialog-content>\n" +
    "            <div class=\"md-dialog-content\">\n" +
    "\t\t\t\t<div ng-repeat=\"property in ::modal.properties track by $index\">\n" +
    "\t\t\t\t\t<lb-property property=\"::property\" row=\"modal.row\" model=\"::modal.model\" form=\"::modal.form\" error-messages=\"modal.errorMessages\"></lb-property>\n" +
    "\t\t\t\t</div>\n" +
    "\n" +
    "                <div class=\"buttons\">\n" +
    "                    <md-button type=\"button\" ng-click=\"$root.closeModal()\">\n" +
    "                        {{:: 'cancel' | text }}\n" +
    "                    </md-button>\n" +
    "\n" +
    "                    <md-button type=\"submit\" class=\"md-primary md-raised\">\n" +
    "                        {{ modal.type }}\n" +
    "                    </md-button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </md-dialog-content>\n" +
    "    </form>\n" +
    "</md-dialog>"
  );


  $templateCache.put('templates/property/belongs-to.tpl.html',
    "<md-data-table-toolbar class=\"property\">\n" +
    "    <div>{{ property.label }}</div>\n" +
    "</md-data-table-toolbar>\n" +
    "\n" +
    "\n" +
    "<md-data-table-container>\n" +
    "    <table md-data-table md-row-select=\"selected\" md-progress=\"deferred\" class=\"md-primary\">\n" +
    "        <thead md-order=\"query.order\" md-trigger=\"onOrderChange\">\n" +
    "            <tr>\n" +
    "                <th ng-repeat=\"property in model.properties track by $index\" name=\"{{:: property.label | modelToHuman }}\" order-by=\"{{:: property.name }}\"></th>\n" +
    "            </tr>\n" +
    "        </thead>\n" +
    "\n" +
    "        <tbody>\n" +
    "            <tr md-auto-select>\n" +
    "                <td ng-repeat=\"property in model.properties track by $index\">\n" +
    "                    <lb-column property=\"::property\" row=\"value\" rows=\"rows\" model=\"::model\"></lb-column>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "</md-data-table-container>"
  );


  $templateCache.put('templates/property/checkbox.tpl.html',
    "<md-switch ng-model=\"value\" id=\"{{ :: name }}\" name=\"{{ :: name }}\" aria-label=\"{{ :: name}}\" class=\"md-primary admin-switch\">\n" +
    "  <span ng-class=\"{ 'barred-text': !value }\">\n" +
    "    {{ :: property.label | modelToHuman }} <span ng-if=\"property.validation.required\">*</span>\n" +
    "  </span>\n" +
    "</md-switch>"
  );


  $templateCache.put('templates/property/choice.tpl.html',
    "<md-select placeholder=\"{{ name }}\" ng-model=\"$parent.value\" ng-required=\"v.required\">\n" +
    "  <md-option ng-repeat=\"choice in choices\" value=\"{{ choice.value }}\">\n" +
    "    {{ choice.label  | modelToHuman }}\n" +
    "  </md-option>\n" +
    "</md-select>"
  );


  $templateCache.put('templates/property/choices.tpl.html',
    "<md-chips\n" +
    "  ng-model=\"value\"\n" +
    "  placeholder=\"Enter a tag\"\n" +
    "  delete-button-label=\"Remove Tag\"\n" +
    "  delete-hint=\"Press delete to remove tag\"\n" +
    "  secondary-placeholder=\"+Tag\">\n" +
    "</md-chips>"
  );


  $templateCache.put('templates/property/date.tpl.html',
    "<md-datepicker\n" +
    "  id=\"{{ name }}\"\n" +
    "  md-placeholder=\"{{ property.label | modelToHuman }}\"\n" +
    "  ng-model=\"value\"\n" +
    "  ng-required=\"v.required\">\n" +
    "</md-datepicker>\n"
  );


  $templateCache.put('templates/property/has-many.tpl.html',
    "<md-data-table-toolbar class=\"property\">\n" +
    "    <div>{{ property.label }}</div>\n" +
    "</md-data-table-toolbar>\n" +
    "\n" +
    "<md-data-table-container>\n" +
    "    <table md-data-table md-progress=\"deferred\" class=\"md-primary\" ng-show=\"count\">\n" +
    "        <thead md-order=\"query.order\" md-trigger=\"onOrderChange\">\n" +
    "            <tr>\n" +
    "                <th ng-repeat=\"property in model.properties track by $index\" name=\"{{:: property.label | modelToHuman }}\" order-by=\"{{:: property.name }}\"></th>\n" +
    "            </tr>\n" +
    "        </thead>\n" +
    "\n" +
    "        <tbody>\n" +
    "            <tr ng-repeat=\"row in rows | orderBy: query.order | limitTo: query.limit track by $index\">\n" +
    "                <td ng-repeat=\"property in model.properties track by $index\">\n" +
    "                    <lb-column property=\"::property\" row=\"row\" rows=\"rows\" model=\"::model\"></lb-column>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "        </tbody>\n" +
    "\n" +
    "        <table md-data-table class=\"md-primary\" ng-hide=\"count\">\n" +
    "            <thead md-order=\"query.order\">\n" +
    "                <tr>\n" +
    "                    <th ng-repeat=\"property in model.properties track by $index\" name=\"{{:: property.label }}\" order-by=\"{{:: property.name }}\"></th>\n" +
    "                </tr>\n" +
    "            </thead>\n" +
    "            <tbody ng-if=\"!count\">\n" +
    "                <tr>\n" +
    "                    <td colspan=\"{{ model.properties.length + 1 }}\">No records found.</td>\n" +
    "                </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "    </table>\n" +
    "</md-data-table-container>"
  );


  $templateCache.put('templates/property/input.tpl.html',
    "<md-input-container>\n" +
    "    <label>{{ property.label | modelToHuman }} <span ng-if=\"property.validation.required\">*</span></label>\n" +
    "    <input type=\"{{ type || 'text' }}\" ng-model=\"value\" id=\"{{ name }}\" name=\"{{ name }}\" ng-required=\"v.required\" ng-minlength=\"v.minlength\" ng-maxlength=\"v.maxlength\"/>\n" +
    "\n" +
    "    <div ng-messages=\"form.$error\" role=\"alert\">\n" +
    "        <div ng-repeat=\"errorMessage in errorMessages\">\n" +
    "            <div>{{ errorMessage }}</div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</md-input-container>"
  );


  $templateCache.put('templates/routing/ban.tpl.html',
    "<div class=\"content-margin\">\n" +
    "  <cms-table flex\n" +
    "  \tname=\"{{ ::listController.view.name }}\"\n" +
    "  \tproperties=\"::listController.properties\"\n" +
    "  \tmodel=\"::listController.model\">\n" +
    "  </cms-table>\n" +
    "</div>"
  );


  $templateCache.put('templates/routing/browser.tpl.html',
    "<md-sidenav flex flex-order=\"1\" md-component-id=\"left\" md-is-locked-open=\"$mdMedia('gt-md')\" layout=\"column\" style=\"float: left\" id=\"left-col\" class=\"md-black-primary-default background\">\n" +
    "    <cms-current-user></cms-current-user>\n" +
    "\n" +
    "    <md-sidemenu menu=\"browserController.menu\"></md-sidemenu>\n" +
    "\n" +
    "</md-sidenav>\n" +
    "\n" +
    "<section flex flex-order=\"2\" layout=\"column\" style=\"margin: 0px; max-height: 100%;\">\n" +
    "    <div ui-view style=\"overflow: auto;\"></div>\n" +
    "</section>\n"
  );


  $templateCache.put('templates/routing/dashboard.tpl.html',
    "<cms-toolbar title=\"'Dashboard'\" layout=\"row\"></cms-toolbar>\n" +
    "\n" +
    "<div class='md-padding' layout=\"row\" layout-wrap>\n" +
    "    <!--<a ui-sref=\"ban\">Baneados</a>-->\n" +
    "    <!--\n" +
    "    <div flex=\"50\" ng-repeat=\"model in dashboardController.models\">\n" +
    "        <md-card>\n" +
    "            <md-card-content>\n" +
    "                <cms-table name=\"{{ ::model.name }}\"\n" +
    "                    properties=\"::model.properties\"\n" +
    "                    model=\"::model\"\n" +
    "                    column-limit=\"4\">\n" +
    "                </cms-table>\n" +
    "            </md-card-content>\n" +
    "        </md-card>\n" +
    "    </div>\n" +
    "    -->\n" +
    "</div>\n"
  );


  $templateCache.put('templates/routing/error.tpl.html',
    "<cms-toolbar title=\"{{ ::'notFound' | text }}\" layout=\"row\"></cms-toolbar>\n" +
    "\n" +
    "<section flex layout=\"column\" class=\"main-container\">\n" +
    "    <md-content layout=\"row\" class=\"dashboard-content content-margin\">\n" +
    "        <div class=\"row dashboard-content\">\n" +
    "            <div flex layout=\"column\">\n" +
    "                {{ ::'noPageFound' | text }}\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </md-content>\n" +
    "</section>\n"
  );


  $templateCache.put('templates/routing/landing-page.tpl.html',
    "<div id=\"landing-page\" ng-style=\"{ 'background-image': landing.background.image }\" class=\"overlay\">\r" +
    "\n" +
    "    <md-toolbar>\r" +
    "\n" +
    "        <div class=\"md-toolbar-tools\">\r" +
    "\n" +
    "            <span flex></span>\r" +
    "\n" +
    "            <md-button ui-sref=\"register\">{{:: 'register' | text }}</md-button>\r" +
    "\n" +
    "            <md-button ui-sref=\"login\" class=\"login\">{{:: 'login' | text }}</md-button>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </md-toolbar>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <section layout=\"column\" layout-align=\"center center\" layout-fill=\"layout-fill\">\r" +
    "\n" +
    "        <div layout=\"column\">\r" +
    "\n" +
    "            <md-content layout=\"column\" class=\"md-padding\">\r" +
    "\n" +
    "                <h1>{{:: 'homeTagline' | text }}</h1>\r" +
    "\n" +
    "                <md-button ui-sref=\"login\" class=\"md-primary md-raised\">{{:: 'homeButtonText' | text }}</md-button>\r" +
    "\n" +
    "            </md-content>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </section>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <span style=\"position: absolute; font-weight: 500; bottom: 0; right: 0; margin: 10px 15px; color: white;\">{{ landing.background.title }}</span>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('templates/routing/list.tpl.html',
    "<div class=\"content-margin\">\n" +
    "  <cms-table flex\n" +
    "  \tname=\"{{ ::listController.view.name }}\"\n" +
    "  \tproperties=\"::listController.properties\"\n" +
    "  \tmodel=\"::listController.model\">\n" +
    "  </cms-table>\n" +
    "</div>"
  );


  $templateCache.put('templates/routing/login.tpl.html',
    "<form ng-submit=\"loginController.login(credentials)\">\n" +
    "    <md-input-container flex>\n" +
    "        <label>{{:: loginController.userLoginField | text }}</label>\n" +
    "        <input type=\"text\" ng-model=\"credentials[loginController.userLoginField]\">\n" +
    "    </md-input-container>\n" +
    "\n" +
    "    <md-input-container flex>\n" +
    "        <label>{{:: 'password' | text }}</label>\n" +
    "        <input type=\"password\" ng-model=\"credentials.password\">\n" +
    "        <div class=\"forgot-password\" ng-click=\"loginController.showPasswordResetModal($event)\">{{:: 'forgot' | text }}</div>\n" +
    "    </md-input-container>\n" +
    "\n" +
    "    <md-container flex layout=\"row\">\n" +
    "        <md-checkbox ng-model=\"credentials.rememberMe\" class=\"md-primary\">{{:: 'rememberMe' | text }}</md-checkbox>\n" +
    "        <span flex></span>\n" +
    "        <md-button type=\"submit\" class=\"md-primary md-raised\">{{:: 'login' | text }}</md-button>\n" +
    "    </md-container>\n" +
    "</form>\n" +
    "\n" +
    "<p>{{:: 'noAccount' | text }} <a ui-sref=\"register\">{{:: 'registerHere' | text }}</a> {{:: 'orLoginWith' | text }}</p>\n" +
    "<cms-social-buttons></cms-social-buttons>"
  );


  $templateCache.put('templates/routing/register-login.tpl.html',
    "<section id=\"login-page\" layout=\"column\" layout-align=\"center center\" layout-fill=\"layout-fill\">\r" +
    "\n" +
    "    <div layout=\"column\" style=\"width: 500px; max-width: 90%\" class=\"login-container md-whiteframe-z1\">\r" +
    "\n" +
    "        <md-toolbar layout=\"row\">\r" +
    "\n" +
    "            <h2 class=\"md-toolbar-tools\">\r" +
    "\n" +
    "                {{ pageTitle }}\r" +
    "\n" +
    "            </h2>\r" +
    "\n" +
    "        </md-toolbar>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <md-content layout=\"column\" class=\"md-padding\">\r" +
    "\n" +
    "            <div ui-view=\"content\"></div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <md-progress-circular class=\"loader\" ng-show=\"loading\" md-mode=\"indeterminate\"></md-progress-circular>\r" +
    "\n" +
    "        </md-content>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</section>"
  );


  $templateCache.put('templates/routing/register.tpl.html',
    "<form ng-submit=\"submit()\">\n" +
    "    <md-input-container flex>\n" +
    "        <label>{{:: 'email' | text }}</label>\n" +
    "        <input type=\"text\" ng-model=\"credentials.email\">\n" +
    "    </md-input-container>\n" +
    "\n" +
    "    <md-input-container flex>\n" +
    "        <label>{{:: 'password' | text }}</label>\n" +
    "        <input type=\"password\" ng-model=\"credentials.password\">\n" +
    "    </md-input-container>\n" +
    "\n" +
    "    <md-input-container class=\"bottom-padding\" flex>\n" +
    "        <label>{{:: 'repeatPassword' | text }}</label>\n" +
    "        <input type=\"password\" ng-model=\"credentials.password_confirmation\">\n" +
    "    </md-input-container>\n" +
    "\n" +
    "    <md-container flex layout=\"row\">\n" +
    "        <cms-social-buttons></cms-social-buttons>\n" +
    "        <span flex></span>\n" +
    "        <md-button type=\"submit\" class=\"md-primary md-raised\">{{:: 'register' | text }}</md-button>\n" +
    "    </md-container>\n" +
    "\n" +
    "</form>\n" +
    "\n" +
    "<p>{{:: 'alreadyHaveAccount' | text }} <a ui-sref=\"login\">{{:: 'logInHere' | text }}</a></p>"
  );


  $templateCache.put('templates/table/column/boolean.tpl.html',
    "<span ng-class=\"{'ion-checkmark-round': isOk, 'ion-close-round': !isOk}\"></span>"
  );


  $templateCache.put('templates/table/column/choices.tpl.html',
    "<md-chips ng-repeat=\"value in values track by $index\"><md-chip>{{ value }}</md-chip></md-chips>"
  );


  $templateCache.put('templates/table/column/date.tpl.html',
    "<span>{{ value | date:format }}</span>"
  );


  $templateCache.put('templates/table/column/number.tpl.html',
    "<span>{{ value | numeraljs:property.format }}</span>"
  );


  $templateCache.put('templates/table/column/string.tpl.html',
    "<span>{{ value }}</span>"
  );


  $templateCache.put('templates/table/table.tpl.html',
    "<md-data-table-toolbar class=\"md-primary-default background\" ng-hide=\"table.selected.length || table.filter.show\">\r" +
    "\n" +
    "    <a ui-sref=\"list({ model: table.model.name })\">\r" +
    "\n" +
    "        <h2 class=\"md-title md-primary-default background\">{{ :: table.model.label | modelToHuman }}</h2>\r" +
    "\n" +
    "    </a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div flex></div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <md-button class=\"md-icon-button\" ng-click=\"table.filter.show = true\">\r" +
    "\n" +
    "        <i class=\"material-icons md-dark\">search</i>\r" +
    "\n" +
    "    </md-button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <md-button class=\"md-icon-button\" ng-click=\"table.showRowModal('create', null, $event)\">\r" +
    "\n" +
    "        <i class=\"material-icons md-dark\">add</i>\r" +
    "\n" +
    "    </md-button>\r" +
    "\n" +
    "</md-data-table-toolbar>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<md-data-table-toolbar class=\"md-warn-default background\" ng-show=\"table.selected.length\">\r" +
    "\n" +
    "    <div>\r" +
    "\n" +
    "        <h2 class=\"md-title\">{{table.selected.length}} {{table.selected.length > 1 ? 'items' : 'item'}} selected</h2>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div flex></div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <md-button class=\"md-icon-button\" ng-click=\"table.deleteRows(table.selected, $event)\">\r" +
    "\n" +
    "        <i class=\"material-icons md-dark\">delete</i>\r" +
    "\n" +
    "    </md-button>\r" +
    "\n" +
    "</md-data-table-toolbar>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<md-data-table-toolbar ng-show=\"table.filter.show && !table.selected.length\">\r" +
    "\n" +
    "    <i class=\"material-icons md-dark\">search</i>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <form flex name=\"table.filter.form\">\r" +
    "\n" +
    "        <input type=\"text\" autofocus ng-model=\"table.query.filter\" ng-model-options=\"table.filter.options\" ng-change=\"table.onFilterChange(table.query.filter, $event)\" placeholder=\"search\">\r" +
    "\n" +
    "    </form>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <md-button class=\"md-icon-button\" ng-click=\"table.removeFilter()\">\r" +
    "\n" +
    "        <i class=\"material-icons md-dark\">close</i>\r" +
    "\n" +
    "    </md-button>\r" +
    "\n" +
    "</md-data-table-toolbar>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<md-data-table-container>\r" +
    "\n" +
    "    <table md-data-table md-row-select=\"table.selected\" md-progress=\"table.deferred\" class=\"md-primary\" ng-show=\"table.count\">\r" +
    "\n" +
    "        <thead md-order=\"table.query.order\" md-trigger=\"table.onOrderChange\">\r" +
    "\n" +
    "            <tr>\r" +
    "\n" +
    "                <th ng-repeat=\"property in table.model.properties track by $index\" name=\"{{:: property.label | modelToHuman }}\" order-by=\"{{:: property.name }}\"></th>\r" +
    "\n" +
    "                <th class=\"loopback-admin-column-actions\">&nbsp;</th>\r" +
    "\n" +
    "            </tr>\r" +
    "\n" +
    "        </thead>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <tbody>\r" +
    "\n" +
    "            <tr md-auto-select ng-repeat=\"row in table.rows | orderBy: table.query.order | limitTo: table.query.limit track by $index\">\r" +
    "\n" +
    "                <td ng-repeat=\"property in table.model.properties track by $index\">\r" +
    "\n" +
    "                    <lb-column property=\"::property\" row=\"row\" rows=\"table.rows\" model=\"::table.model\"></lb-column>\r" +
    "\n" +
    "                </td>\r" +
    "\n" +
    "                <td class=\"md-table-column-actions\">\r" +
    "\n" +
    "                    <i class=\"material-icons md-dark\" ng-click=\"table.showRowModal('edit', row, $event); $event.stopPropagation()\">mode_edit</i>\r" +
    "\n" +
    "                    <md-tooltip>{{:: 'edit' | text }}</md-tooltip>\r" +
    "\n" +
    "                </td>\r" +
    "\n" +
    "            </tr>\r" +
    "\n" +
    "        </tbody>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <table md-data-table class=\"md-primary\" ng-hide=\"table.count\">\r" +
    "\n" +
    "            <thead md-order=\"table.query.order\">\r" +
    "\n" +
    "                <tr>\r" +
    "\n" +
    "                    <th ng-repeat=\"property in table.model.properties track by $index\" name=\"{{:: property.label }}\" order-by=\"{{:: property.name }}\"></th>\r" +
    "\n" +
    "                    <th class=\"loopback-admin-column-actions\">&nbsp;</th>\r" +
    "\n" +
    "                </tr>\r" +
    "\n" +
    "            </thead>\r" +
    "\n" +
    "            <tbody ng-if=\"!table.count\">\r" +
    "\n" +
    "                <tr>\r" +
    "\n" +
    "                    <td colspan=\"{{ table.model.properties.length + 1 }}\">No records found.</td>\r" +
    "\n" +
    "                </tr>\r" +
    "\n" +
    "            </tbody>\r" +
    "\n" +
    "        </table>\r" +
    "\n" +
    "    </table>\r" +
    "\n" +
    "</md-data-table-container>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<md-data-table-pagination md-limit=\"table.query.limit\" md-page=\"table.query.page\" md-total=\"{{table.count}}\" md-trigger=\"table.onPageChange\"></md-data-table-pagination>"
  );

}]);
