export type BattleTag = string

export type BNetUser = {
  battletag: BattleTag,
  provider: 'bnet',
  token: string
}

export type BNetCharacter = {
  name: string
  class: number
  realm: string
  guild: string
  level: number
}
