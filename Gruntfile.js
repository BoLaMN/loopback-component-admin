{ normalize } = require 'path'

module.exports = (grunt) ->
  require('load-grunt-tasks') grunt

  grunt.initConfig
    config:
      dist: normalize "#{__dirname}/dist"

    concat:
      js:
        src: [
          'src/client/vendor/js/**/*.js'
          'src/client/vendor/js/**'
        ]
        dest: 'dist/public/js/loopback-admin.vendor.js'

      css:
        src: [
          'src/client/vendor/css/**/*.css'
          'src/client/vendor/css/**'
        ]
        dest: 'dist/public/css/loopback-admin.vendor.css'

    copy:
      dist:
        src: ['package.json']
        dest: normalize "#{__dirname}/dist"
        expand: true
      main:
        files: [
          { expand: true, cwd: 'src/client/assets/', src: ['**'], dest: 'dist/public' }
        ]

    clean:
      dist: src: [ '<%= config.dist %>/*.js', '<%= config.dist %>/public/js/*.js', '<%= config.dist %>/public/{css,images,index.html,!config.json}', '!<%= config.dist %>/public/js/{loopback-admin.resources,loopback-admin.config}.js' ]

    coffee:
      app:
        options:
          bare: true
          join: true
        files: 'dist/public/js/loopback-admin.js': ['src/client/app.coffee', 'src/client/components/*.coffee', 'src/client/components/**/**.coffee']
      main:
        options:
          bare: true
          join: true
        expand: true
        cwd: 'src/component'
        src: [ '**/*.coffee' ]
        dest: 'dist/'
        ext: '.js'

    # https://www.npmjs.com/package/grunt-angular-templates
    ngtemplates:
      material:
        options:
          standalone: true
          module: 'loopback-admin.theme'
        cwd: 'src/client'
        src: ['templates/**/*.html']
        dest: 'dist/public/js/loopback-admin.templates.js'

    watch:
      less: files: ['src/client/styles/*.less', 'src/client/styles/**/*.less'], tasks: ['less'], options: livereload: true
      ngtemplates: files: ['src/client/**/*/**.html'], tasks: ['ngtemplates', 'concat' ], options: livereload: true
      coffee: files: ['src/client/*.coffee', 'src/client/**/**.coffee'], tasks: ['coffee', 'ngAnnotate', 'ngtemplates', 'concat'], options: livereload: true
      vendor_js: files: ['src/client/vendor/js/**'], tasks: ['ngtemplates', 'concat:js'], options: livereload: true
      vendor_css: files: ['src/client/vendor/css/**'], tasks: ['concat:css'], options: livereload: true
      copy: files: ['src/client/assets/**'], tasks: ['copy'], options: livereload: true

    # https://www.npmjs.com/package/grunt-express
    express: all: options:
      port: 4000
      hostname: 'localhost'
      bases: [ __dirname + '/dist/public' ]
      livereload: true

    open: all: path: 'http://localhost:<%= express.all.options.port%>'

    # https://www.npmjs.com/package/grunt-ng-annotate
    ngAnnotate:
      dist:
        files: 'dist/public/js/loopback-admin.js': [ 'dist/public/js/loopback-admin.js' ]

    less:
      build:
        files: 'dist/public/css/loopback-admin.css': 'src/client/styles/layout.less'

  grunt.event.on 'watch', (action, filepath, target) ->
    grunt.log.writeln target + ': ' + filepath + ' has ' + action
    return

  grunt.registerTask 'server', ['default', 'express', 'open', 'watch']
  grunt.registerTask 'default', [ 'clean', 'coffee', 'ngtemplates', 'ngAnnotate', 'concat', 'copy:dist', 'copy:main', 'less' ]
  grunt.registerTask 'dev', [ 'default', 'watch' ]