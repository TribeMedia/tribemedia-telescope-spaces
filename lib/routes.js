/**
 * Created by gqadonis on 7/22/15.
 */

Telescope.menuItems.add("adminMenu", {
  route: 'spaces',
  label: 'Spaces',
  description: 'manage_spaces'
});

var SpaceController = RouteController.extend({
  currentSpace: function () {
    return Spaces.findOne({_id: this.params.id});
  },
  getTitle: function () {
    return this.currentSpace() && this.currentSpace().name;
  },
  data: function () {
    return this.currentSpace();
  }
});

Posts.controllers.space_list = RouteController.extend({

  template: "space_posts_list",

  showViewsNav: true,

  data: function () {

    var terms = {
      spaceId: Session.get('currentSpaceId'),
      view: this.view,
      limit: this.params.limit || Settings.get('postsPerPage', 10),
      enableCache: true
    };

    // console.log('----------------- router running');

    // note: the post list controller template will handle all subscriptions, so we just need to pass in the terms
    return {
      terms: terms
    };
  },

  getTitle: function () {
    return i18n.t(this.view);
  },

  getDescription: function () {
    if (Router.current().route.getName() === 'space_posts_default') { // return site description on root path
      return Settings.get('description');
    } else {
      return i18n.t(_.findWhere(Telescope.menuItems.get("spaceViewsMenu"), {label: this.view}).description);
    }
  }

});

var getDefaultSpaceViewController = function () {
  var defaultView = Settings.get('defaultView', 'space_top');
  // if view we got from settings is available in Posts.views object, use it
  if (!!Posts.controllers[defaultView]) {
    return Posts.controllers[defaultView];
  } else {
    return Posts.controllers.top;
  }
};

// wrap in startup block to make sure Settings collection is defined
Meteor.startup(function () {
  Posts.controllers.space_default = getDefaultSpaceViewController().extend({
    getTitle: function () {
      var title = Settings.get('title', 'Telescope');
      var tagline = Settings.get('tagline');
      var fullTitle = !!tagline ? title + ' – ' + tagline : title ;
      return fullTitle;
    }
  });
});

/**
 * Controller for top view
 */
Posts.controllers.space_top = Posts.controllers.list.extend({
  view: 'space_top'
});

/**
 * Controller for new view
 */
Posts.controllers.space_new = Posts.controllers.list.extend({
  view: 'space_new'
});

/**
 * Controller for best view
 */
Posts.controllers.space_best = Posts.controllers.list.extend({
  view: 'space_best'
});

/**
 * Controller for pending view
 */
Posts.controllers.space_pending = Posts.controllers.list.extend({
  view: 'space_pending'
});

/**
 * Controller for scheduled view
 */
Posts.controllers.space_scheduled = Posts.controllers.list.extend({
  view: 'space_scheduled'
});

/**
 * Controller for single post page
 */
Posts.controllers.space_page = RouteController.extend({

  template: 'post_page',

  subscriptions: function () {
    this.postSubscription = Telescope.subsManager.subscribe('singleSpacePost', this.params._id);
    this.postUsersSubscription = Telescope.subsManager.subscribe('postSpaceUsers', this.params._id);
    this.commentSubscription = Telescope.subsManager.subscribe('commentsList', {view: 'postComments', postId: this.params._id});
  },

  post: function() {
    return Posts.findOne(this.params._id);
  },

  getTitle: function () {
    if (!!this.post())
      return this.post().title;
  },

  onBeforeAction: function () {
    if (!this.post()) {
      if (this.postSubscription.ready()) {
        this.render('not_found');
      }
    } else {
      this.next();
    }
  },

  onRun: function() {
    var sessionId = Meteor.default_connection && Meteor.default_connection._lastSessionId ? Meteor.default_connection._lastSessionId : null;
    Meteor.call('increasePostViews', this.params._id, sessionId);
    this.next();
  },

  data: function() {
    return {post: this.post()};
  },

  onAfterAction: function () {
    var post = this.post();
    if (post) {
      if (post.slug !== this.params.slug) {
        window.history.replaceState({}, "", post.getPageUrl());
      }
      $('link[rel="canonical"]').attr("href", post.getPageUrl(true));
    }
  },

  fastRender: true
});


Meteor.startup(function() {
  Router.onBeforeAction(Router._filters.isAdmin, {only: ['spaces']});

  Router.route('/space/:id', {
    name: 'space',
    controller: SpaceController
  });

  Router.route('/spaces', {
    name: 'spaces',
    controller: Telescope.controllers.admin
  });
});
