import { WowClassSafeName, WowSpecSafeName, WowTag } from './classes'

export type PlayerSelectionChoice = 'first' | 'second' | 'third'
export const PLAYER_SELECTION_CHOICES: PlayerSelectionChoice[] = ['first', 'second', 'third']

export type LockSelectionChoice = 'main' | 'alt'
export const LOCK_SELECTION_CHOICES: LockSelectionChoice[] = ['main', 'alt']

// User data

export interface APIUser {
  battletag: string
  isAdmin: boolean
  isSuperAdmin: boolean
}

// Database data

// Player selections

interface DBPlayerSelection {
  class?: WowClassSafeName
  spec?: WowSpecSafeName
  comments?: string
}

export interface DBPlayerSelections {
  first?: DBPlayerSelection
  second?: DBPlayerSelection
  third?: DBPlayerSelection
}

// Lock selections

interface DBLockPlayerSelection {
  choice: PlayerSelectionChoice
}

interface DBLockPlayerSelectionsData {
  main: DBLockPlayerSelection
  alt: DBLockPlayerSelection
}

interface DBLockPlayerSelectionsMeta {
  locked: boolean
  confirmed: boolean
}

export type DBLockPlayerSelections = DBLockPlayerSelectionsData & DBLockPlayerSelectionsMeta

// Data sent from app to client for main view

type APIPlayerSelection = DBPlayerSelection

export type APIPlayerSelections = {
  first?: APIPlayerSelection
  second?: APIPlayerSelection
  third?: APIPlayerSelection
} & DBLockPlayerSelections

// Data sent from app to client for overview

export interface APIOverviewPlayerSelections {
  [battletag: string]: APIPlayerSelections
}

// Payloads to send to app to lock and unlock selections for a player

type APILockSelections = DBLockPlayerSelectionsData

export interface APILockSelectionsPayload {
  battletag: string
  playerOverviewSelections: APILockSelections
}

export interface APIUnlockSelectionsPayload {
  battletag: string
}

// Data sent from app to client for summary view

export interface APISummarySelection {
  playerName: string
  class: WowClassSafeName
  spec: WowSpecSafeName
  choice: LockSelectionChoice
  locked: boolean
  confirmed: boolean
  tags: WowTag[]
}

export interface APISummarySelections {
  selections: APISummarySelection[]
}

// Defined valid types for transmission

export type AppPayload = APIPlayerSelections | APIOverviewPlayerSelections | APISummarySelection

export type ClientPayload = APILockSelectionsPayload | APIUnlockSelectionsPayload

// Method type signatures for app and client data loader/fetch

export type AppDataLoader<T extends AppPayload, O = {}> = (options?: O) => T

export type ClientDataFetcher<T extends AppPayload, D = T> = () => Promise<D>
