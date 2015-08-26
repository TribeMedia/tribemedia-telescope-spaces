/**
 * Created by gqadonis on 7/22/15.
 */
Spaces = new Mongo.Collection('spaces');

Spaces.schema = new SimpleSchema({
  name: {
    type: String
  },
  slug: {
    type: String,
    optional: true
  },
  description: {
    type: String,
    optional: true
  },
  image: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
    editableBy: ["admin"]
  },
  coverImage: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
    editableBy: ["admin"]
  },
  ownerId: {
    type: String,
    optional: true,
    editableBy: ["admin"],
    autoform: {
      instructions: 'The space is owned by this user.',
      options: function () {
        var users = Meteor.users.find().map(function (user) {
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


Spaces.schema.internationalize();

Spaces.attachSchema(Spaces.schema);

Spaces.before.insert(function (userId, doc) {
  // if no slug has been provided, generate one
  if (!doc.slug)
    doc.slug = Telescope.utils.slugify(doc.name);
});

Spaces.getUrl = function(id){
  return Router.path("space", {id: id});
};

Spaces.getCurrentSpace = function() {
  var id = Session.get('currentSpaceId');
  if (id) {
    return Spaces.findOne({_id: id });
  }
  return null;
}

Meteor.startup(function() {
  Spaces.allow({
    insert: Users.is.adminById,
    update: Users.is.adminById,
    remove: Users.is.adminById
  });
});
