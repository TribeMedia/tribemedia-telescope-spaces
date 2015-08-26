/**
 * Created by gqadonis on 7/22/15.
 */
Meteor.startup(function () {
  Template.spaces.helpers({
    spaces: function(){
      return Spaces.find({}, {sort: {order: 1}});
    }
  });
});
