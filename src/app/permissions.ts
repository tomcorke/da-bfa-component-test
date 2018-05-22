import { BNetUser } from './types'

require('dotenv-safe').config()

const superadmin = process.env.SUPERADMIN
const admins = (process.env.ADMINS && process.env.ADMINS.split(',')) || []

const isAdmin = (user: BNetUser) => {
  return superadmin === user.battletag ||
    admins.includes(user.battletag)
}

const isSuperAdmin = (user: BNetUser) => {
  return superadmin === user.battletag
}

export { isAdmin, isSuperAdmin }
