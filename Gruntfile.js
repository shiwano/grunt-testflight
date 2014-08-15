'use strict';

require('./test/test_helper');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        'test/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Configuration to be run (and then tested).
    testflight: {
      default_options: {
        options: {
          apiToken: 'Enter your api token',
          teamToken: 'Enter your team token',
          file: 'test/fixtures/test.ipa',
          dsym: 'test/fixtures/test.dsym',
          notify: true,
          replace: true,
          distributionLists: ['Enter your distribution list name'],
          onDone: function(result) {
            console.log(result);
          },
          notes: function(done) {
            setTimeout(function() {
              done('notes async');
            }, 1);
          }
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first run this plugin's task(s),
  // then test the result.
  grunt.registerTask('test', ['testflight', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
