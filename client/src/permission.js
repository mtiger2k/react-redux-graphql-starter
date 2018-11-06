const PERMISSIONS = {
  'ROLE_ADMIN': {
  	'user': ['list', 'view', 'add', 'update', 'delete'],
  }
}

export const hasPermission = (role, module, action) => {
  const actions = PERMISSIONS[role]?PERMISSIONS[role][module]:null;
  if (actions && actions.indexOf(action) != -1) return true;
  return false;
}
