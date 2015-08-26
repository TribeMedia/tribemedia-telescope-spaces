/**
 * Created by gqadonis on 7/22/15.
 */

Telescope.menuItems.add("spaceViewsMenu", [
  {
    route: 'space_posts_top',
    label: 'top',
    description: 'most_popular_posts'
  },
  {
    route: 'space_posts_new',
    label: 'new',
    description: 'newest_posts'
  },
  {
    route: 'space_posts_best',
    label: 'best',
    description: 'highest_ranked_posts_ever'
  },
  {
    route: 'space_posts_pending',
    label: 'pending',
    description: 'posts_awaiting_moderation',
    adminOnly: true
  },
  {
    route: 'space_posts_scheduled',
    label: 'scheduled',
    description: 'future_scheduled_posts',
    adminOnly: true
  },
]);
