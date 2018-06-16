export type WowRoleTag =
  | 'tank'
  | 'healer'
  | 'dps'

export type WowPositionTag =
  | 'melee'
  | 'ranged'

export type WowArmorTag =
  | 'cloth'
  | 'leather'
  | 'mail'
  | 'plate'

export type WowStatTag =
  | 'int'
  | 'agi'
  | 'str'

export type WowTag =
  | WowRoleTag
  | WowPositionTag
  | WowArmorTag
  | WowStatTag

export interface WowSpecialisation {
  safeName: WowSpecSafeName
  displayName: string
  tags?: WowTag[]
}

export interface WowClass {
  safeName: WowClassSafeName
  displayName: string
  tags?: WowTag[]
  specialisations: WowSpecialisation[]
}

export type WowClassSafeName =
  | 'deathknight'
  | 'demonhunter'
  | 'druid'
  | 'hunter'
  | 'mage'
  | 'monk'
  | 'paladin'
  | 'priest'
  | 'rogue'
  | 'shaman'
  | 'warlock'
  | 'warrior'

export type WowSpecSafeName =
  | 'frost'
  | 'unholy'
  | 'blood'
  | 'havoc'
  | 'vengeance'
  | 'guardian'
  | 'feral'
  | 'balance'
  | 'restoration'
  | 'beastmastery'
  | 'marksmanship'
  | 'survival'
  | 'fire'
  | 'arcane'
  | 'windwalker'
  | 'mistweaver'
  | 'brewmaster'
  | 'retribution'
  | 'holy'
  | 'protection'
  | 'shadow'
  | 'discipline'
  | 'subtelty'
  | 'assassination'
  | 'combat'
  | 'enhancement'
  | 'elemental'
  | 'demonology'
  | 'destruction'
  | 'affliction'
  | 'arms'
  | 'fury'
