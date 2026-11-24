import type { AbilityDetail } from './adminTypes'
import type { Skill } from './gameTypes'

export const LEAVE_KINDS = ['end', 'notify', 'time'] as const
export type LeaveKind = (typeof LEAVE_KINDS)[number]

export type StepDraft = {
  skillId: number
  montageKey: string
  leaveKind: LeaveKind
  leaveNotify: number | null
  leaveTime: number | null
  nextStart: number
}

export type SwapDraft = { step: number; time: number } | null

export type AbilityDraft = {
  name: string
  sortIndex: number
  isDraft: boolean
  hardSwap: SwapDraft
  recommendedSwap: SwapDraft
  steps: StepDraft[]
}

function leaveKind(kind: string): LeaveKind {
  const known = LEAVE_KINDS.find((candidate) => candidate === kind)
  if (known === undefined) {
    throw new Error(`unknown leave kind ${kind}`)
  }
  return known
}

function swap(step: number | null, time: number | null): SwapDraft {
  return step === null || time === null ? null : { step, time }
}

export function draftOf(ability: AbilityDetail): AbilityDraft {
  return {
    name: ability.name,
    sortIndex: ability.sortIndex,
    isDraft: ability.isDraft,
    hardSwap: swap(ability.hardSwapStep, ability.hardSwapTime),
    recommendedSwap: swap(ability.recommendedSwapStep, ability.recommendedSwapTime),
    steps: ability.path.map((step) => ({
      skillId: step.skillId,
      montageKey: step.montageKey,
      leaveKind: leaveKind(step.leaveKind),
      leaveNotify: step.leaveNotify,
      leaveTime: step.leaveTime,
      nextStart: step.nextStart,
    })),
  }
}

export function firstStep(skills: Skill[]): StepDraft {
  const skill = skills.find((candidate) => candidate.montages.length > 0)
  const montage = skill?.montages[0]
  if (skill === undefined || montage === undefined) {
    throw new Error('this character has no skill with a montage')
  }
  return stepFor(skill.id, montage.assetKey)
}

export function stepFor(skillId: number, montageKey: string): StepDraft {
  return { skillId, montageKey, leaveKind: 'end', leaveNotify: null, leaveTime: null, nextStart: 0 }
}
