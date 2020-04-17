export type BattleTag = string;

export interface BNetUser {
  battletag: BattleTag;
  provider: "bnet";
  token: string;
}

export interface BNetCharacter {
  name: string;
  class: number;
  realm: string;
  guild: string;
  level: number;
}
