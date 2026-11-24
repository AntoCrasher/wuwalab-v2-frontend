import { stepFor, type StepDraft } from '@/lib/abilityDraft'
import { frames } from '@/lib/gameFormat'
import type { Skill } from '@/lib/gameTypes'

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
      <select
        className="inline-select"
        aria-label="Skill"
        value={step.skillId}
        onChange={(event) => pickSkill(Number(event.target.value))}
      >
        {playable.map((candidate) => (
          <option key={candidate.id} value={candidate.id}>
            {candidate.id} {candidate.name}
          </option>
        ))}
      </select>
      <select
        className="inline-select"
        aria-label="Montage"
        value={step.montageKey}
        onChange={(event) => onChange(stepFor(step.skillId, event.target.value))}
      >
        {(skill?.montages ?? []).map((montage) => (
          <option key={montage.assetKey} value={montage.assetKey}>
            {montage.name} {montage.length === undefined ? '' : frames(montage.length)}
          </option>
        ))}
      </select>
    </>
  )
}
