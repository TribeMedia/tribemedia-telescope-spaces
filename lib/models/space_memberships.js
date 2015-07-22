/**
 * Created by gqadonis on 7/22/15.
 */
SpaceMemberships = new Mongo.Collection("space_memberships");

SpaceMemberships.schema = new SimpleSchema({
  spaceId: {
    type: String,
    optional: true,
    editableBy: ["admin"],
    autoform: {
      instructions: 'The space the user is a member of.',
      options: function () {
        var spaces = Spaces.find().map(function (space) {
          return {
            value: space._id,
            label: space.name
          };
        });
        return spaces;
      }
    }
  },
  userId: {
    type: String,
    optional: true,
    editableBy: ["admin"],
    autoform: {
      instructions: 'The user member.',
      options: function () {
        var users = Users.find().map(function (user) {
          return {
            value: user._id,
            label: Users.getDisplayName(user)
          };
        });
        return users;
      }
    }
  }
});


SpaceMemberships.schema.internationalize();

SpaceMemberships.attachSchema(SpaceMemberships.schema);
