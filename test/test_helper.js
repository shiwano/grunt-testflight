'use strict';

var nock = require('nock');

global.nockScope = nock('http://testflightapp.com')
  .post('/api/builds.json').reply(200, 'OK');
