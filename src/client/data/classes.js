const classData = [
  {
    name: 'Death Knight',
    specialisations: [
      {
        name: 'Frost',
        tags: ['dps', 'melee', 'str', 'plate']
      },
      {
        name: 'Unholy',
        tags: ['dps', 'melee', 'str', 'plate']
      },
      {
        name: 'Blood',
        tags: ['tank', 'str', 'plate']
      }
    ]
  },
  {
    name: 'Demon Hunter',
    specialisations: [
      {
        name: 'Havoc',
        tags: ['dps', 'melee', 'agi', 'leather']
      },
      {
        name: 'Vengeance',
        tags: ['tank', 'agi', 'leather']
      }
    ]
  },
  {
    name: 'Druid',
    specialisations: [
      {
        name: 'Guardian',
        tags: ['tank', 'agi', 'leather']
      },
      {
        name: 'Feral',
        tags: ['dps', 'melee', 'agi', 'leather']
      },
      {
        name: 'Balance',
        tags: ['dps', 'ranged', 'int', 'leather']
      },
      {
        name: 'Restoration',
        tags: ['healer', 'int', 'leather']
      }
    ]
  },
  {
    name: 'Hunter',
    specialisations: [
      {
        name: 'Beast Mastery',
        tags: ['dps', 'ranged', 'agi', 'mail']
      },
      {
        name: 'Marksmanship',
        tags: ['dps', 'ranged', 'agi', 'mail']
      },
      {
        name: 'Survival',
        tags: ['dps', 'melee', 'agi', 'mail']
      }
    ]
  },
  {
    name: 'Mage',
    specialisations: [
      {
        name: 'Frost',
        tags: ['dps', 'ranged', 'int', 'cloth']
      },
      {
        name: 'Fire',
        tags: ['dps', 'ranged', 'int', 'cloth']
      },
      {
        name: 'Arcane',
        tags: ['dps', 'ranged', 'int', 'cloth']
      }
    ]
  },
  {
    name: 'Monk',
    specialisations: [
      {
        name: 'Windwalker',
        tags: ['dps', 'melee', 'agi', 'leather']
      },
      {
        name: 'Mistweaver',
        tags: ['healer', 'int', 'leather']
      },
      {
        name: 'Brewmaster',
        tags: ['tank', 'agi', 'leather']
      }
    ]
  },
  {
    name: 'Paladin',
    specialisations: [
      {
        name: 'Retribution',
        tags: ['dps', 'melee', 'str', 'plate']
      },
      {
        name: 'Holy',
        tags: ['healer', 'int', 'plate']
      },
      {
        name: 'Protection',
        tags: ['tank', 'str', 'plate']
      }
    ]
  },
  {
    name: 'Priest',
    specialisations: [
      {
        name: 'Shadow',
        tags: ['dps', 'ranged', 'int', 'cloth']
      },
      {
        name: 'Holy',
        tags: ['healer', 'int', 'cloth']
      },
      {
        name: 'Discipline',
        tags: ['healer', 'int', 'cloth']
      }
    ]
  },
  {
    name: 'Rogue',
    specialisations: [
      {
        name: 'Subtelty',
        tags: ['dps', 'melee', 'agi', 'leather']
      },
      {
        name: 'Assassination',
        tags: ['dps', 'melee', 'agi', 'leather']
      },
      {
        name: 'Combat',
        tags: ['dps', 'melee', 'agi', 'leather']
      }
    ]
  },
  {
    name: 'Shaman',
    specialisations: [
      {
        name: 'Enhancement',
        tags: ['dps', 'melee', 'agi', 'mail']
      },
      {
        name: 'Elemental',
        tags: ['dps', 'ranged', 'int', 'mail']
      },
      {
        name: 'Restoration',
        tags: ['healer', 'int', 'mail']
      }
    ]
  },
  {
    name: 'Warlock',
    specialisations: [
      {
        name: 'Demonology',
        tags: ['dps', 'ranged', 'int', 'cloth']
      },
      {
        name: 'Destruction',
        tags: ['dps', 'ranged', 'int', 'cloth']
      },
      {
        name: 'Affiliction',
        tags: ['dps', 'ranged', 'int', 'cloth']
      }
    ]
  },
  {
    name: 'Warrior',
    specialisations: [
      {
        name: 'Arms',
        tags: ['dps', 'melee', 'str', 'plate']
      },
      {
        name: 'Fury',
        tags: ['dps', 'melee', 'str', 'plate']
      },
      {
        name: 'Protection',
        tags: ['tank', 'str', 'plate']
      }
    ]
  }
]

classData.forEach(c => {
  c.safeName = c.name.toLowerCase().replace(/\s/g, '')
  c.specialisations.forEach(s => {
    s.safeName = s.name.toLowerCase().replace(/\s/g, '')
  })
})

export const classNames = classData
  .reduce((classNames, c) => {
    return {
      ...classNames,
      [c.safeName]: c.name
    }
  }, {})

export const specNames = classData
  .reduce((allSpecs, c) => allSpecs.concat(c.specialisations), [])
  .reduce((specNames, s) => {
    return {
      ...specNames,
      [s.safeName]: s.name
    }
  }, {})

export default classData
