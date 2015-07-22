/**
 * Created by gqadonis on 7/22/15.
 */
Package.describe({
  name: 'tribemedia:spaces',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/tribemedia/tribemedia-telescope-spaces.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.0");

  api.use(['telescope:core@0.21.1',
    'dbarrett:dropzonejs',
    'cfs:standard-packages',
    'aldeed:autoform@5.3.2',
    'cfs:autoform@2.2.1',
    'cfs:dropbox',
    'jonblum:jquery-cropper']);

  api.addFiles([
    'lib/models/spaces.js',
    'lib/models/space_memberships.js',
    'lib/modules.js',
    'lib/hooks.js',
    'lib/callbacks.js',
    'lib/methods.js',
    'lib/menus.js',
    'lib/routes.js'
  ], ['client', 'server']);

  api.addFiles([
    'lib/client/templates/space.html',
    'lib/client/templates/space.js',
    'lib/client/templates/spaces.html',
    'lib/client/templates/spaces.js',
    'lib/client/templates/buttons/space_invite_button.html',
    'lib/client/templates/buttons/space_invite_button.js',
    'lib/client/templates/spaces_menu.html',
    'lib/client/templates/spaces_menu.js'
  ], 'client');

  api.addFiles([
    'lib/server/publications.js'
  ], ['server']);

  api.addFiles([
    "i18n/en.i18n.json"
  ], ["client", "server"]);

  api.export([
    'Spaces'
  ]);
});



Package.onTest(function(api) {
  api.use('tinytest');
  api.use('tribemedia:spaces');
  api.addFiles('spaces-tests.js');
});
