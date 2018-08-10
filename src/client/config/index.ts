import { guildConfig, GuildConfig } from '../../guild-config'
import { Endpoints } from './common'

interface MockData {
  mockUserData?: any
  mockOverviewData?: any
  initialView?: string
}

type Config = GuildConfig & Endpoints & MockData

const config: Config = {
  ...guildConfig,
  ...require(`./${process.env.NODE_ENV}`).default as Endpoints
}

export default config
