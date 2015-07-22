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
