import { CommonConfig, Endpoints } from './common'

interface MockData {
  mockUserData?: any
  mockOverviewData?: any
  initialView?: string
}

type Config = CommonConfig & Endpoints & MockData

const config = require(`./${process.env.NODE_ENV}`).default as Config

export default config
