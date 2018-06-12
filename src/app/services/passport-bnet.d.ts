declare module 'passport-bnet' {
  import { Strategy as PassportStrategy } from 'passport'
  export class Strategy extends PassportStrategy {
    constructor (
      strategyOptions: {
        clientID: string
        clientSecret: string
        scope: 'wow.profile'
        callbackURL: string
      },
      handler: (
        accessToken: string,
        refreshToken: string,
        profile: object,
        done: (a: any, b: any) => void
      ) => void
    )

  }
}
