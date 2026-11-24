import type { GameCharacter, Notify } from './gameTypes'

export type AbilitySummary = {
  id: number
  name: string
  abilityType: string | null
  sortIndex: number
  isDraft: boolean
  steps: number
  hitNotifies: number
  length: number
  firstHit: number | null
  skillId: number | null
  cooldown: number | null
  priority: number | null
  hardSwapStep: number | null
  hardSwapTime: number | null
  recommendedSwapStep: number | null
  recommendedSwapTime: number | null
}

export type AdminCharacter = GameCharacter & { abilities: AbilitySummary[] }

export type BulletNode = {
  id: number
  missing: boolean
  name?: string
  collisionDelay?: number
  hitInterval?: number
  hitsPerTarget?: number
  totalHits?: number
  damages: { id: number; rateLv: number[] }[]
  children: { delay: number; count: number; trigger: number; bullet: BulletNode }[]
}

export type PathNotify = Notify & { at: number; bullets: BulletNode[] }

export type PathStep = {
  position: number
  skillId: number
  skillName: string | null
  montageKey: string
  montageName: string | null
  montageLength: number | null
  leaveKind: string
  leaveNotify: number | null
  leaveTime: number | null
  nextStart: number
  from: number
  until: number
  base: number
  notifies: PathNotify[]
}

export type AbilityDetail = AbilitySummary & { path: PathStep[] }
