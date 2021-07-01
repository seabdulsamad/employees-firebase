import api from "@/plugins/data";

export default function ({ store, route, redirect, app }) {
  console.log('Route Name: ' + route.name);
  // Reset the page header action items on route change
  store.dispatch('pageHeader/setActionItems', []);

  let routeName = _.split(route.name, '-')[0];
  routeName = routeName == 'index' ? '/' : routeName;
  // Match the menu item
  let menuItem = _.filter(api.mainMenu, item => {
    if (_.includes(item.to, routeName))
      return item;
  });

  let icon = menuItem.length ? menuItem[0].icon : 'business';

  store.dispatch('pageHeader/setIcon', icon);
}