angular.module('loopback-admin').provider('$mdColors', function ($mdColorPalette) {
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
}).config(function ($mdThemingProvider, $mdColorsProvider) {
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
});
