/**
 * Created by gqadonis on 7/7/15.
 */
Template.spaces_menu.helpers({
  hasSpaces: function () {
    return Spaces.find().count();
  },
  spaces: function () {
    return Spaces.find();
  },
  menuItems: function () {
    var menuItems = _.map(Spaces.find({}, {sort: {order: 1, name: 1}}).fetch(), function (space) {
      return {
        route: function () {
          return Spaces.getUrl(space._id);
        },
        label: space.name
      };
    });
    return menuItems;
  },
  menuMode: function () {
    if (!!this.mobile) {
      return 'list';
    } else if (Settings.get('navLayout', 'top-nav') === 'top-nav') {
      return 'dropdown';
    } else {
      return 'accordion';
    }
  }
});
