import * as React from 'react'

import * as STYLES from './non-guild.scss'

interface NonGuildProps {
  guild: string
  realm: string
  region: string
}

const NonGuild = ({ guild, realm, region }: NonGuildProps) => {
  return <p className={STYLES.nonGuild}>
    This site is intended only for members of &lt;{guild}&gt; on {realm} ({region}). If you are joining the guild for Battle for Azeroth please contact an officer to have at least one character added to the guild before using this site.
  </p>
}

export default NonGuild
