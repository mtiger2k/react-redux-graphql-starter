import { hasPermission } from './permission'

const generateMenus = (user, tenant) => ({
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
      enabled: true,
    },
    {
      name: 'Users',
      icon: 'fa fa-group',
      enabled: true,
      children: [
        {
          name: 'User List',
          url: '/users',
          icon: 'fa fa-user',
          variant: 'submenu',
          enabled: hasPermission(user.role, 'user', 'list')
        },
      ],
    },
    {
      title: true,
      name: 'Samples',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: '',             // optional class names space delimited list for title item ex: "text-center"
      enabled: true,
    },
    {
      name: 'Counter',
      url: '/counter',
      icon: 'icon-drop',
      enabled: true,
    },
    {
      name: 'Channels',
      url: '/channels',
      icon: 'icon-pencil',
      enabled: true,
    },
  ],
});

export const getMenu = (user, tenant) => {
  const menus = user?generateMenus(user, tenant):{items: []};
  const newItems = [];
  menus.items.forEach(item => {
    if (item.enabled) {
      if (item.children) {
        item.children = item.children.filter(child => child.enabled === undefined || child.enabled);
      }
      if (!item.children || (item.children && item.children.length > 0))
        newItems.push(item);
    }
  })
  return { items: newItems};
}