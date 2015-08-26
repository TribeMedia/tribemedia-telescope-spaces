/**
 * Created by gqadonis on 7/22/15.
 */

Posts.addField({
  fieldName: 'spaceId',
  fieldSchema: {
    type: String,
    optional: true,
    editableBy: ["member", "admin"],
    autoform: {
      options: function () {
        return Spaces.find().map(function (space) {
          return {
            value: space._id,
            label: space.name
          };
        });
      }
    }
  }
});

Posts.getSpaceSubParams = function (terms) {

  // add this to ensure all post publications pass audit-arguments-check
  check(terms, Match.Any);

  var maxLimit = 200;

  // console.log(terms)

  // note: using jquery's extend() with "deep" parameter set to true instead of shallow _.extend()
  // see: http://api.jquery.com/jQuery.extend/

  // initialize parameters by extending baseParameters object, to avoid passing it by reference
  var parameters = Telescope.utils.deepExtend(true, {}, Posts.views.baseParameters);

  // if view is not defined, default to "top"
  var view = !!terms.view ? Telescope.utils.dashToCamel(terms.view) : 'space_top';

  // get query parameters according to current view
  if (typeof Posts.views[view] !== 'undefined')
    parameters = Telescope.utils.deepExtend(true, parameters, Posts.views[view](terms));

  // extend sort to sort posts by _id to break ties
  Telescope.utils.deepExtend(true, parameters, {options: {sort: {_id: -1}}});

  // if a limit was provided with the terms, add it too (note: limit=0 means "no limit")
  if (typeof terms.limit !== 'undefined')
    _.extend(parameters.options, {limit: parseInt(terms.limit)});

  // limit to "maxLimit" posts at most when limit is undefined, equal to 0, or superior to maxLimit
  if(!parameters.options.limit || parameters.options.limit === 0 || parameters.options.limit > maxLimit) {
    parameters.options.limit = maxLimit;
  }

  // hide future scheduled posts unless "showFuture" is set to true or postedAt is already defined
  if (!parameters.showFuture && !parameters.find.postedAt)
    parameters.find.postedAt = {$lte: new Date()};

  // filter by category if category _id is provided
  // NOTE: this is a temporary fix because views cannot currently be combined
  if (!!terms.category) {
    var categoryId = Categories.findOne({slug: terms.category})._id;
    parameters.find.categories = {$in: [categoryId]};
  }

  // console.log(parameters);

  return parameters;
};
