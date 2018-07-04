import { WowClassSafeName, WowSpecSafeName, WowClass, WowSpecialisation } from '../types/classes'

const classData: WowClass[] = []

classData.push({
  safeName: 'deathknight',
  displayName: 'Death Knight',
  tags: ['str', 'plate'],
  specialisations: [
    {
      safeName: 'frost',
      displayName: 'Frost',
      tags: ['dps', 'melee']
    },
    {
      safeName: 'unholy',
      displayName: 'Unholy',
      tags: ['dps', 'melee']
    },
    {
      safeName: 'blood',
      displayName: 'Blood',
      tags: ['tank']
    }
  ]
})
classData.push({
  safeName: 'demonhunter',
  displayName: 'Demon Hunter',
  tags: ['agi', 'leather'],
  specialisations: [
    {
      safeName: 'havoc',
      displayName: 'Havoc',
      tags: ['dps', 'melee']
    },
    {
      safeName: 'vengeance',
      displayName: 'Vengeance',
      tags: ['tank']
    }
  ]
})
classData.push({
  safeName: 'druid',
  displayName: 'Druid',
  tags: ['leather'],
  specialisations: [
    {
      safeName: 'guardian',
      displayName: 'Guardian',
      tags: ['tank', 'agi']
    },
    {
      safeName: 'feral',
      displayName: 'Feral',
      tags: ['dps', 'melee', 'agi']
    },
    {
      safeName: 'balance',
      displayName: 'Balance',
      tags: ['dps', 'ranged', 'int']
    },
    {
      safeName: 'restoration',
      displayName: 'Restoration',
      tags: ['healer', 'int']
    }
  ]
})
classData.push({
  safeName: 'hunter',
  displayName: 'Hunter',
  tags: ['dps', 'agi', 'mail'],
  specialisations: [
    {
      safeName: 'beastmastery',
      displayName: 'Beast Mastery',
      tags: ['ranged']
    },
    {
      safeName: 'marksmanship',
      displayName: 'Marksmanship',
      tags: ['ranged']
    },
    {
      safeName: 'survival',
      displayName: 'Survival',
      tags: ['melee']
    }
  ]
})
classData.push({
  safeName: 'mage',
  displayName: 'Mage',
  tags: ['dps', 'ranged', 'int', 'cloth'],
  specialisations: [
    {
      safeName: 'frost',
      displayName: 'Frost'
    },
    {
      safeName: 'fire',
      displayName: 'Fire'
    },
    {
      safeName: 'arcane',
      displayName: 'Arcane'
    }
  ]
})
classData.push({
  safeName: 'monk',
  displayName: 'Monk',
  tags: ['leather'],
  specialisations: [
    {
      safeName: 'windwalker',
      displayName: 'Windwalker',
      tags: ['dps', 'melee', 'agi']
    },
    {
      safeName: 'mistweaver',
      displayName: 'Mistweaver',
      tags: ['healer', 'int']
    },
    {
      safeName: 'brewmaster',
      displayName: 'Brewmaster',
      tags: ['tank', 'agi']
    }
  ]
})
classData.push({
  safeName: 'paladin',
  displayName: 'Paladin',
  tags: ['plate'],
  specialisations: [
    {
      safeName: 'retribution',
      displayName: 'Retribution',
      tags: ['dps', 'melee', 'str']
    },
    {
      safeName: 'holy',
      displayName: 'Holy',
      tags: ['healer', 'int']
    },
    {
      safeName: 'protection',
      displayName: 'Protection',
      tags: ['tank', 'str']
    }
  ]
})
classData.push({
  safeName: 'priest',
  displayName: 'Priest',
  tags: ['int', 'cloth'],
  specialisations: [
    {
      safeName: 'shadow',
      displayName: 'Shadow',
      tags: ['dps', 'ranged']
    },
    {
      safeName: 'holy',
      displayName: 'Holy',
      tags: ['healer']
    },
    {
      safeName: 'discipline',
      displayName: 'Discipline',
      tags: ['healer']
    }
  ]
})
classData.push({
  safeName: 'rogue',
  displayName: 'Rogue',
  tags: ['dps', 'melee', 'agi', 'leather'],
  specialisations: [
    {
      safeName: 'subtelty',
      displayName: 'Subtelty'
    },
    {
      safeName: 'assassination',
      displayName: 'Assassination'
    },
    {
      safeName: 'outlaw',
      displayName: 'Outlaw'
    }
  ]
})
classData.push({
  safeName: 'shaman',
  displayName: 'Shaman',
  tags: ['mail'],
  specialisations: [
    {
      safeName: 'enhancement',
      displayName: 'Enhancement',
      tags: ['dps', 'melee', 'agi']
    },
    {
      safeName: 'elemental',
      displayName: 'Elemental',
      tags: ['dps', 'ranged', 'int']
    },
    {
      safeName: 'restoration',
      displayName: 'Restoration',
      tags: ['healer', 'int']
    }
  ]
})
classData.push({
  safeName: 'warlock',
  displayName: 'Warlock',
  tags: ['dps', 'ranged', 'int', 'cloth'],
  specialisations: [
    {
      safeName: 'demonology',
      displayName: 'Demonology'
    },
    {
      safeName: 'destruction',
      displayName: 'Destruction'
    },
    {
      safeName: 'affliction',
      displayName: 'Affliction'
    }
  ]
})
classData.push({
  safeName: 'warrior',
  displayName: 'Warrior',
  tags: ['str', 'plate'],
  specialisations: [
    {
      safeName: 'arms',
      displayName: 'Arms',
      tags: ['dps', 'melee']
    },
    {
      safeName: 'fury',
      displayName: 'Fury',
      tags: ['dps', 'melee']
    },
    {
      safeName: 'protection',
      displayName: 'Protection',
      tags: ['tank']
    }
  ]
})

export const getClass = (safeClassName?: WowClassSafeName) => {
  return classData.find(c => c.safeName === safeClassName) || undefined
}

export const getClassName = (safeClassName?: WowClassSafeName) => {
  const c = getClass(safeClassName)
  return c && c.displayName || undefined
}

export const getSpec = (safeClassName?: WowClassSafeName, safeSpecName?: WowSpecSafeName) => {
  const c = getClass(safeClassName)
  return c && c.specialisations.find(s => s.safeName === safeSpecName) || undefined
}

export const getSpecName = (safeSpecName?: WowSpecSafeName) => {
  const specs = classData.reduce((allSpecs: WowSpecialisation[], c) => allSpecs.concat(c.specialisations), [])
  const s = specs.find(s => s.safeName === safeSpecName)
  return s && s.displayName || undefined
}

export const getTags = (safeClassName?: WowClassSafeName, safeSpecName?: WowSpecSafeName) => {
  const c = getClass(safeClassName)
  const s = getSpec(safeClassName, safeSpecName)
  const classTags = c && c.tags || []
  const specTags = s && s.tags || []
  return classTags.concat(specTags)
}

export default classData
