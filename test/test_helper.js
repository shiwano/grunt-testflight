'use strict';

var fs = require('fs');
var nock = require('nock');

global.nockScope = nock('http://testflightapp.com')
  .post('/api/builds.json').reply(200, function() {
      return fs.readFileSync('./test/fixtures/result.json', 'utf8');
  });
