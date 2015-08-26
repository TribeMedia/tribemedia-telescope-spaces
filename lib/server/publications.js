/**
 * Created by gqadonis on 7/22/15.
 */

Meteor.publish('spaces', function() {
  return Spaces.find({});
});

Meteor.publish('spacePostsList', function(terms) {
  if(Users.can.viewById(this.userId)){
    var parameters = Posts.getSpaceSubParams(terms),
      posts = Posts.find(parameters.find, parameters.options);

    return posts;
  }
  return [];
});

// Publish all the users that have posted the currently displayed list of posts
// plus the commenters for each post

Meteor.publish('spacePostsListUsers', function(terms) {
  if(Users.can.viewById(this.userId)){
    var parameters = Posts.getSpaceSubParams(terms),
      posts = Posts.find(parameters.find, parameters.options),
      userIds = _.pluck(posts.fetch(), 'userId');

    // for each post, add first four commenter's userIds to userIds array
    posts.forEach(function (post) {
      userIds = userIds.concat(_.first(post.commenters,4));
    });

    userIds = _.unique(userIds);

    return Meteor.users.find({_id: {$in: userIds}}, {fields: Users.pubsub.avatarProperties, multi: true});
  }
  return [];
});

