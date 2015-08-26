/**
 * Created by gqadonis on 7/22/15.
 */

Template.space.helpers({
  title: function() {
    return this.name;
  }
})

Template.space.rendered = function() {
  Session.set('currentSpaceId', this.data._id);
  console.log('Current space: ' + this.data.name);
}

Template.space.destroyed = function() {
  Session.set('currentSpaceId', null);
}

