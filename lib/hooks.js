/**
 * Created by gqadonis on 7/22/15.
 */
Telescope.modules.add("primaryNav", {
  template: 'spaces_menu',
  order: 0
});

Telescope.modules.add("mobileNav", {
  template: 'spaces_menu',
  order: 0
});

// we want to wait until spaces are all loaded to load the rest of the app
Telescope.subscriptions.preload('spaces');
