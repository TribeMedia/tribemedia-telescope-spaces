/**
 * Created by gqadonis on 7/22/15.
 */

Posts.views.add("spacePosts", function (terms) {
  var spaceId = terms.spaceId;

    // if space id not specified use the current space...
  if (!spaceId || typeof (spaceId) === 'undefined') {
    // get from current..
  }

  return {
    find: {spaceId: spaceId},
    options: {limit: 5, sort: {postedAt: -1}}
  };
});

// redefine the rest of the post views here to exclude those with a space ID....
Posts.views.baseParameters = {
  find: {
    status: Posts.config.STATUS_APPROVED,
    spaceId: null
  },
  options: {
    limit: 10
  }
};

/**
 * Top view
 */
Posts.views.add("top", function (terms) {
  return {
    find: {
      spaceId: null
    },
    options: {sort: {sticky: -1, score: -1}}
  };
});

/**
 * New view
 */
Posts.views.add("new", function (terms) {
  return {
    find: {
      spaceId: null
    },
    options: {sort: {sticky: -1, postedAt: -1}}
  };
});

/**
 * Best view
 */
Posts.views.add("best", function (terms) {
  return {
    find: {
      spaceId: null
    },
    options: {sort: {sticky: -1, baseScore: -1}}
  };
});

/**
 * Pending view
 */
Posts.views.add("pending", function (terms) {
  return {
    find: {
      status: 1,
      spaceId: null
    },
    options: {sort: {createdAt: -1}},
    showFuture: true
  };
});

/**
 * Scheduled view
 */
Posts.views.add("scheduled", function (terms) {
  return {
    find: {postedAt: {$gte: new Date()}, spaceId: null},
    options: {sort: {postedAt: -1}}
  };
});

// for spaces...

Posts.views.add("space_top", function (terms) {
  return {
    find: {
      spaceId: Session.get('currentSpaceId')
    },
    options: {sort: {sticky: -1, score: -1}}
  };
});

/**
 * New view
 */
Posts.views.add("space_new", function (terms) {
  return {
    find: {
      spaceId: Session.get('currentSpaceId')
    },
    options: {sort: {sticky: -1, postedAt: -1}}
  };
});

/**
 * Best view
 */
Posts.views.add("space_best", function (terms) {
  return {
    find: {
      spaceId: Session.get('currentSpaceId')
    },
    options: {sort: {sticky: -1, baseScore: -1}}
  };
});

/**
 * Pending view
 */
Posts.views.add("space_pending", function (terms) {
  return {
    find: {
      status: 1,
      spaceId: Session.get('currentSpaceId')
    },
    options: {sort: {createdAt: -1}},
    showFuture: true
  };
});

/**
 * Scheduled view
 */
Posts.views.add("space_scheduled", function (terms) {
  return {
    find: {postedAt: {$gte: new Date()}, spaceId: Session.get('currentSpaceId')},
    options: {sort: {postedAt: -1}}
  };
});

/**
 * User posts view
 */
Posts.views.add("userPosts", function (terms) {
  return {
    find: {userId: terms.userId, spaceId: null },
    options: {limit: 5, sort: {postedAt: -1}}
  };
});

