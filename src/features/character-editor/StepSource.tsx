import { stepFor, type StepDraft } from '@/lib/abilityDraft'
import { frames } from '@/lib/gameFormat'
import type { Skill } from '@/lib/gameTypes'
import { GridSelect } from '@/ui'

type Props = { step: StepDraft; skills: Skill[]; onChange: (step: StepDraft) => void }

const NO_MONTAGE = ''

function montageOptions(skill: Skill | undefined) {
  const montages = skill?.montages ?? []
  if (montages.length === 0) {
    return [{ value: NO_MONTAGE, label: 'no montage' }]
  }
  return montages.map((montage) => ({
    value: montage.assetKey,
    label: `${montage.name ?? montage.assetKey} ${montage.length === undefined ? '' : frames(montage.length)}`,
  }))
}

export function StepSource({ step, skills, onChange }: Props) {
  const skill = skills.find((candidate) => candidate.id === step.skillId)

  function pickSkill(skillId: number) {
    const montage = skills.find((candidate) => candidate.id === skillId)?.montages[0]
    onChange(stepFor(skillId, montage?.assetKey ?? null))
  }

  return (
    <>
      <GridSelect
        label="Skill"
        value={String(step.skillId)}
        options={skills.map((candidate) => ({
          value: String(candidate.id),
          label: `${candidate.id} ${candidate.name}`,
        }))}
        onChange={(skillId) => pickSkill(Number(skillId))}
      />
      <GridSelect
        label="Montage"
        value={step.montageKey ?? NO_MONTAGE}
        options={montageOptions(skill)}
        onChange={(montageKey) =>
          onChange(stepFor(step.skillId, montageKey === NO_MONTAGE ? null : montageKey))
        }
      />
    </>
  )
}
