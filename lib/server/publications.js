/**
 * Created by gqadonis on 7/22/15.
 */

Meteor.publish('spaces', function() {
  return Spaces.find({});
});
