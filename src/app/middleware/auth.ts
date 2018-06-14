import * as express from 'express'

export const requireAuthentication = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.isAuthenticated && req.isAuthenticated() && req.user) {
    return next()
  }

  if (!req.isAuthenticated()) {
    return res.status(401).send()
  }
}
