export interface WowSpecialisation {
  name: string,
  tags?: string[]
}

export interface WowClass {
  name: string,
  tags?: string[],
  specialisations: WowSpecialisation[]
}

const classData: WowClass[] = [
  {
    name: 'Death Knight',
    tags: ['str', 'plate'],
    specialisations: [
      {
        name: 'Frost',
        tags: ['dps', 'melee']
      },
      {
        name: 'Unholy',
        tags: ['dps', 'melee']
      },
      {
        name: 'Blood',
        tags: ['tank']
      }
    ]
  },
  {
    name: 'Demon Hunter',
    tags: ['agi', 'leather'],
    specialisations: [
      {
        name: 'Havoc',
        tags: ['dps', 'melee']
      },
      {
        name: 'Vengeance',
        tags: ['tank']
      }
    ]
  },
  {
    name: 'Druid',
    tags: ['leather'],
    specialisations: [
      {
        name: 'Guardian',
        tags: ['tank', 'agi']
      },
      {
        name: 'Feral',
        tags: ['dps', 'melee', 'agi']
      },
      {
        name: 'Balance',
        tags: ['dps', 'ranged', 'int']
      },
      {
        name: 'Restoration',
        tags: ['healer', 'int']
      }
    ]
  },
  {
    name: 'Hunter',
    tags: ['dps', 'agi', 'mail'],
    specialisations: [
      {
        name: 'Beast Mastery',
        tags: ['ranged']
      },
      {
        name: 'Marksmanship',
        tags: ['ranged']
      },
      {
        name: 'Survival',
        tags: ['melee']
      }
    ]
  },
  {
    name: 'Mage',
    tags: ['dps', 'ranged', 'int', 'cloth'],
    specialisations: [
      {
        name: 'Frost'
      },
      {
        name: 'Fire'
      },
      {
        name: 'Arcane'
      }
    ]
  },
  {
    name: 'Monk',
    tags: ['leather'],
    specialisations: [
      {
        name: 'Windwalker',
        tags: ['dps', 'melee', 'agi']
      },
      {
        name: 'Mistweaver',
        tags: ['healer', 'int']
      },
      {
        name: 'Brewmaster',
        tags: ['tank', 'agi']
      }
    ]
  },
  {
    name: 'Paladin',
    tags: ['plate'],
    specialisations: [
      {
        name: 'Retribution',
        tags: ['dps', 'melee', 'str']
      },
      {
        name: 'Holy',
        tags: ['healer', 'int']
      },
      {
        name: 'Protection',
        tags: ['tank', 'str']
      }
    ]
  },
  {
    name: 'Priest',
    tags: ['int', 'cloth'],
    specialisations: [
      {
        name: 'Shadow',
        tags: ['dps', 'ranged']
      },
      {
        name: 'Holy',
        tags: ['healer']
      },
      {
        name: 'Discipline',
        tags: ['healer']
      }
    ]
  },
  {
    name: 'Rogue',
    tags: ['dps', 'melee', 'agi', 'leather'],
    specialisations: [
      {
        name: 'Subtelty'
      },
      {
        name: 'Assassination'
      },
      {
        name: 'Combat'
      }
    ]
  },
  {
    name: 'Shaman',
    tags: ['mail'],
    specialisations: [
      {
        name: 'Enhancement',
        tags: ['dps', 'melee', 'agi']
      },
      {
        name: 'Elemental',
        tags: ['dps', 'ranged', 'int']
      },
      {
        name: 'Restoration',
        tags: ['healer', 'int']
      }
    ]
  },
  {
    name: 'Warlock',
    tags: ['dps', 'ranged', 'int', 'cloth'],
    specialisations: [
      {
        name: 'Demonology'
      },
      {
        name: 'Destruction'
      },
      {
        name: 'Affiliction'
      }
    ]
  },
  {
    name: 'Warrior',
    tags: ['str', 'plate'],
    specialisations: [
      {
        name: 'Arms',
        tags: ['dps', 'melee']
      },
      {
        name: 'Fury',
        tags: ['dps', 'melee']
      },
      {
        name: 'Protection',
        tags: ['tank']
      }
    ]
  }
]

export interface SafeWowClass extends WowClass {
  safeName: string
  specialisations: SafeWowSpecialisation[]
}

export interface SafeWowSpecialisation extends WowSpecialisation {
  safeName: string
}

const safeClassData: SafeWowClass[] = classData.map(c => ({
  ...c,
  safeName: c.name.toLowerCase().replace(/\s/g, ''),
  specialisations: c.specialisations.map(s => ({
    ...s,
    safeName: s.name.toLowerCase().replace(/\s/g, '')
  }))
}))

export type ClassNameMap = {
  [safeClassName: string]: string
}

export const classNames: ClassNameMap = safeClassData
  .reduce((classNames, c) => {
    return {
      ...classNames,
      [c.safeName]: c.name
    }
  }, {})

export type SpecNameMap = {
  [safeSpecName: string]: string
}

export const specNames: SpecNameMap = safeClassData
  .reduce((allSpecs: SafeWowSpecialisation[], c) => allSpecs.concat(c.specialisations), [])
  .reduce((specNames, s) => {
    return {
      ...specNames,
      [s.safeName]: s.name
    }
  }, {})

export default safeClassData
