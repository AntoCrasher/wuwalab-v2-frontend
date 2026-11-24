import { stepFor, type StepDraft } from '@/lib/abilityDraft'
import { frames } from '@/lib/gameFormat'
import type { Skill } from '@/lib/gameTypes'
import { GridSelect } from '@/ui'

type Props = { step: StepDraft; skills: Skill[]; onChange: (step: StepDraft) => void }

export function StepSource({ step, skills, onChange }: Props) {
  const playable = skills.filter((candidate) => candidate.montages.length > 0)
  const skill = skills.find((candidate) => candidate.id === step.skillId)

  function pickSkill(skillId: number) {
    const montage = skills.find((candidate) => candidate.id === skillId)?.montages[0]
    onChange(stepFor(skillId, montage?.assetKey ?? ''))
  }

  return (
    <>
      <GridSelect
        label="Skill"
        value={String(step.skillId)}
        options={playable.map((candidate) => ({
          value: String(candidate.id),
          label: `${candidate.id} ${candidate.name}`,
        }))}
        onChange={(skillId) => pickSkill(Number(skillId))}
      />
      <GridSelect
        label="Montage"
        value={step.montageKey}
        options={(skill?.montages ?? []).map((montage) => ({
          value: montage.assetKey,
          label: `${montage.name ?? montage.assetKey} ${montage.length === undefined ? '' : frames(montage.length)}`,
        }))}
        onChange={(montageKey) => onChange(stepFor(step.skillId, montageKey))}
      />
    </>
  )
}
