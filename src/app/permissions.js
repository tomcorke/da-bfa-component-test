import { DB } from './db'

const superadmin = 'Shot#2975'

const assignablePermissions = [
  'viewData'
]

const permissionsDb = new DB('permissions', [])

const getPermissions = (user) => {
  const permissions = permissionsDb.get(user.battletag) || []
  if (user.battletag === superadmin) {
    permissions.push('superadmin')
  }
  return permissions
}

const addPermission = (user, permission) => {
  if (!assignablePermissions.includes(permission)) return
  const perms = getPermissions(user)
  if (!perms.includes(permission)) perms.push(permission)
  permissionsDb.set(user.battletag, perms)
}

const hasPermission = (user, permission) => {
  return user.battletag === superadmin || getPermissions(user).includes(permission)
}

export { getPermissions, addPermission, hasPermission }
