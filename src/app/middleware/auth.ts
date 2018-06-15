import * as express from 'express'

import { isAdmin, isSuperAdmin } from '../services/permissions'
import { BNetUser } from '../types'

const isAuthenticated = (req: express.Request) => {
  return req.isAuthenticated && req.isAuthenticated() && req.user
}

export const requireAuthentication = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (!isAuthenticated(req)) {
    return res.status(401).send()
  }

  return next()
}

export const requireAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (!isAuthenticated(req)) {
    return res.status(401).send()
  }

  if (!isAdmin(req.user as BNetUser)) {
    return res.status(401).send()
  }

  return next()
}

export const requireSuperAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (!isAuthenticated(req)) {
    return res.status(401).send()
  }

  if (!isSuperAdmin(req.user as BNetUser)) {
    return res.status(401).send()
  }

  return next()
}
