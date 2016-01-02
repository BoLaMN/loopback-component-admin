angular.module 'loopback-admin'

.provider '$mdColors', ($mdColorPalette) ->
  style = angular.element '<style></style>'

  document.head.appendChild style[0]

  stylesheet = style[0].sheet
  index = 0

  colorToRgbaArray = (clr) ->
    if angular.isArray(clr) and clr.length == 3
      return clr

    if /^rgb/.test(clr)
      return clr.replace(/(^\s*rgba?\(|\)\s*$)/g, '').split(',').map (value, i) ->
        if i == 3 then parseFloat(value, 10) else parseInt(value, 10)

    if clr.charAt(0) == '#'
      clr = clr.substring(1)

    if !/^([a-fA-F0-9]{3}){1,2}$/g.test(clr)
      return

    dig = clr.length / 3

    red = clr.substr(0, dig)
    grn = clr.substr(dig, dig)
    blu = clr.substr(dig * 2)

    if dig == 1
      red += red
      grn += grn
      blu += blu

    [ parseInt(red, 16), parseInt(grn, 16), parseInt(blu, 16) ]

  DARK_CONTRAST_COLOR = colorToRgbaArray 'rgba(0,0,0,0.87)'
  LIGHT_CONTRAST_COLOR = colorToRgbaArray 'rgba(255,255,255,0.87'
  STRONG_LIGHT_CONTRAST_COLOR = colorToRgbaArray 'rgb(255,255,255)'

  addCustomStyle = (cssname, name, color, contrast = '') ->
    if contrast
      contrast = "color: #{contrast}"

    stylesheet.insertRule ".md-#{cssname}-#{name}.text { color: #{color} !important }", index
    stylesheet.insertRule ".md-#{cssname}-#{name}.background { background-color: #{color}; #{contrast} }", index + 1

    index += 2

    return

  clearStyleSheet = ->
    while stylesheet.cssRules.length > 0
      stylesheet.deleteRule 0

  colorNames: []
  colorStore: {}

  colorSelected: null

  themeNames: []
  themeStore: {}

  getContrastColor: (palette) ->
    { contrastDefaultColor, lightColors, strongLightColors, darkColors } = palette

    if angular.isString lightColors
      lightColors = lightColors.split ' '

    if angular.isString strongLightColors
      strongLightColors = strongLightColors.split ' '

    if angular.isString darkColors
      darkColors = darkColors.split ' '

    if contrastDefaultColor is 'light'
      if darkColors?.indexOf(hueName) > -1
        DARK_CONTRAST_COLOR
      else
        if strongLightColors?.indexOf(hueName) > -1
          STRONG_LIGHT_CONTRAST_COLOR
        else
          LIGHT_CONTRAST_COLOR
    else
      if lightColors?.indexOf(hueName) > -1
        if strongLightColors?.indexOf(hueName) > -1
          STRONG_LIGHT_CONTRAST_COLOR
        else
          LIGHT_CONTRAST_COLOR
      else
        DARK_CONTRAST_COLOR

  storeAndLoadPalettes: (colors, themes, primaryPalette) ->
    @colorStore = colors
    @themeStore = themes

    @colorNames = Object.keys colors
    @themeNames = Object.keys themes

    @loadPalette primaryPalette

  loadPalette: (newPalette) ->
    if @colorSelected
      clearStyleSheet()

    @colorSelected = newPalette

    for themeName, theme of @themeStore
      cleanedThemeName = if themeName is 'default' then '' else themeName + '-'

      for groupName, group of theme
        for name, color of group
          addCustomStyle cleanedThemeName + groupName, name, color.value, color.contrast

    return

  $get: ->
    colorNames: @colorNames
    colorStore: @colorStore

    colorSelected: @colorSelected

    themeNames: @themeNames
    themeStore: @themeStore

    loadPalette: @loadPalette

.config ($mdThemingProvider, $mdColorsProvider) ->
  colorStore = {}

  parsePalette = (paletteName, palette) ->
    paletteContrast = $mdThemingProvider._rgba $mdColorsProvider.getContrastColor palette
    hueColors = $mdThemingProvider._THEMES['default'].colors['primary'].hues

    colors = {}

    addHue = (hueName) ->
      colors[hueName] = value: palette[hueColors[hueName]], contrast: paletteContrast

    copyColors = (colorName, color) ->
      if /#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})\b/.test(palette[colorName])
        colors[colorName] = value: palette[colorName], contrast: paletteContrast
      return

    colorStore[paletteName] = colors

    Object.keys(palette).forEach copyColors
    Object.keys(hueColors).forEach addHue

    return

  for paletteName, palette of $mdThemingProvider._PALETTES
    parsePalette paletteName, palette

  themeStore = {}

  parseTheme = (themeName) ->
    themeColorGroups = $mdThemingProvider._THEMES[themeName].colors

    colors = {}

    defineColors = (themeGroup) ->
      themeStore[themeName][themeGroup] ?= {}

      definedColors = colorStore[themeColorGroups[themeGroup].name]

      for item, value of themeColorGroups[themeGroup].hues
        themeStore[themeName][themeGroup][item] = definedColors[value]

      return

    themeStore[themeName] ?= {}

    Object.keys(themeColorGroups).forEach defineColors

    return

  Object.keys($mdThemingProvider._THEMES).forEach parseTheme

  primaryPalette = $mdThemingProvider._THEMES['default'].colors.primary.name

  $mdColorsProvider.storeAndLoadPalettes colorStore, themeStore, primaryPalette

  return
