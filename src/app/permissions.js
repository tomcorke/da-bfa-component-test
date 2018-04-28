require('dotenv-safe').config()

const superadmin = process.env.SUPERADMIN
const admins = process.env.ADMINS.split(',')

const isAdmin = (user) => {
  return superadmin === user.battletag ||
    admins.includes(user.battletag)
}

export { isAdmin }
