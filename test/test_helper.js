'use strict';

var fs = require('fs');
var nock = require('nock');

function str2ab(str) {
  var buf = new Buffer(str.length * 2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i = 0; i < str.length; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

global.nockScope = nock('http://testflightapp.com')
  .post('/api/builds.json').reply(200, function() {
      return str2ab(fs.readFileSync('./test/fixtures/result.json', 'utf8'));
  });
