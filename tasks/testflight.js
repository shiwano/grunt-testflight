/*
 * grunt-testflight
 * https://github.com/shiwano/grunt-testflight
 *
 * Copyright (c) 2013 Shogo Iwano
 * Licensed under the MIT license.
 */

'use strict';

var FormData = require('form-data');
var fs = require('fs');

module.exports = function(grunt) {
  var _ = grunt.util._;
  var testFlightAPIUrl = 'http://testflightapp.com/api/builds.json';

  grunt.registerMultiTask('testflight', 'Upload the build to TestFlight', function() {
    var done = this.async();
    var options = this.options({
      apiToken: null,
      teamToken: null,
      file: null,
      notes: null,
      dsym: null,
      distributionLists: [],
      notify: false,
      replace: false
    });

    if (!_.isString(options.apiToken) || !_.isString(options.teamToken) ||
        !_.isString(options.file) || _.isNull(options.notes)) {
      grunt.log.error('Missing required parameter!');
      return done(false);
    }

    if (_.isFunction(options.notes)) {
      options.notes = options.notes(function(notes) {
        if (_.isString(options.notes)) { return; }
        options.notes = notes;
        uploadBuildToTestFlight(options, done);
      });
    }

    if (_.isString(options.notes)) {
      uploadBuildToTestFlight(options, done);
    }
  });

  var uploadBuildToTestFlight = function(options, done) {
    var form = new FormData();
    form.append('api_token', options.apiToken);
    form.append('team_token', options.teamToken);
    form.append('file', fs.createReadStream(options.file));
    form.append('notes', options.notes);
    form.append('distribution_lists', options.distributionLists.join(','));
    form.append('notify', options.notify.toString());
    form.append('replace', options.replace.toString());

    if (/\.ipa$/.test(options.file) && _.isString(options.dsym)) {
      form.append('dsym', fs.createReadStream(options.dsym));
    }

    grunt.log.writeln('Now uploading...');
    form.submit(testFlightAPIUrl, function(err, res) {
      if (err) {
        grunt.log.error(err);
        return done(false);
      }
      if (res.statusCode !== 200) {
        grunt.log.error('Uploading failed with status ' + res.statusCode);
        res.on('data', function (chunk) {
          grunt.log.error(chunk);
        });
        return done(false);
      }
      grunt.log.ok('Uploaded ' + options.file.cyan + ' to TestFlight!');
      done();
    });
  };
};
