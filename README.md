# grunt-testflight [![Build Status](https://secure.travis-ci.org/shiwano/grunt-testflight.png?branch=master)](http://travis-ci.org/shiwano/grunt-testflight)

> Uploads the build to TestFlight

## Getting Started
_If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide._

From the same directory as your project's [Gruntfile][Getting Started] and [package.json][], install this plugin with the following command:

```bash
npm install grunt-testflight --save-dev
```

Once that's done, add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('grunt-testflight');
```

If the plugin has been installed correctly, running `grunt --help` at the command line should list the newly-installed plugin's task or tasks. In addition, the plugin should be listed in package.json as a `devDependency`, which ensures that it will be installed whenever the `npm install` command is run.

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md
[package.json]: https://npmjs.org/doc/json.html

## The "testflight" task

### Overview
In your project's Gruntfile, add a section named `testflight` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  testflight: {
    iOS: {
      options: {
        apiToken: 'Enter your api token',
        teamToken: 'Enter your team token',
        file: 'Enter your build path',
        notes: "It's a awesome app!",
        distributionLists: ['Enter your distribution list'],
        notify: true
      }
    }
  }
})
```

### Options

#### options.apiToken
Type: `String`

Required. [(Get your API token)](https://testflightapp.com/account/#api)

#### options.teamToken
Type: `String`

Required, token for the team being uploaded to. [(Get your team token)](https://testflightapp.com/dashboard/team/edit/?next=/api/doc/)

#### options.file
Type: `String`

Required, file path for the build.

#### options.notes
Type: `String` or `function`

Required, release notes for the build.

#### options.dsym
Type: `String`
Default: `null`

iOS ONLY - the zipped .dSYM corresponding to the build.

#### options.distributionLists
Type: `Array`
Default: `null`

distribution list names which will receive access to the build.

#### options.notify
Type: `Boolean`
Default: `false`

notify permitted teammates to install the build.

#### options.replace
Type: `Boolean`
Default: `false`

#### options.onDone
Type: `Function`
Default: `function (responseJson) {}`

could be used to get JSON Result testflight sends back to each API call (https://testflightapp.com/api/doc/)

replace binary for an existing build if one is found with the same name/bundle version.

### Usage Examples

```js
var gitRev = require('git-rev');

grunt.initConfig({
  localConfig: grunt.file.readYAML('localConfig.yml');

  testflight: {
    options: {
      apiToken: '<%= localConfig.testflight.apiToken %>',
      teamToken: '<%= localConfig.testflight.teamToken %>',
      notes: function(done) { // you can use async function.
        gitRev.long(function(hash) {
          done("commit " + hash);
        });
      },
      distributionLists: ['gatchamen'],
      notify: true
    },

    iOS: {
      options: {
        file: '<%= localConfig.builds.ipa %>'
      }
    },

    android: {
      options: {
        file: '<%= localConfig.builds.apk %>'
      }
    }
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][].

## Release History
 * 2014-08-16   v0.1.3   Print TestFlight API response on error.
 * 2014-08-16   v0.1.2   Add TestFlight JSON result object handling.
 * 2014-01-05   v0.1.1   Handle non 200 responses from testflight.
 * 2013-10-12   v0.1.0   First release.

## License
Copyright (c) 2013 Shogo Iwano
Licensed under the MIT license.
