import { Fragment } from 'react'
import type { AbilityDetail, PathStep } from '@/lib/adminTypes'
import { frames, montagePath } from '@/lib/gameFormat'
import { Link } from '@/ui'

const HEADERS = ['Step', 'Skill', 'Game name', 'Montage', 'Plays from', 'Left at', 'Next starts']

function leftAt(step: PathStep): string {
  if (step.leaveKind === 'end') {
    return `its end, ${frames(step.until)}`
  }
  return step.leaveKind === 'notify'
    ? `notify #${step.leaveNotify}, ${frames(step.until)}`
    : frames(step.until)
}

function swapBlock(step: number | null, time: number | null): string {
  return step === null || time === null ? 'none' : `step ${step + 1} at ${frames(time)}`
}

export function PathTab({ ability }: { ability: AbilityDetail }) {
  return (
    <>
      <div className="panel-grid panel-path">
        {HEADERS.map((label) => (
          <span key={label} className="panel-head">
            {label}
          </span>
        ))}
        {ability.path.map((step) => (
          <Fragment key={step.position}>
            <span>{step.position + 1}</span>
            <span>{step.skillId}</span>
            <span>{step.skillName ?? '-'}</span>
            <span>
              {step.montageKey === null ? (
                <span className="wl-dim">none</span>
              ) : (
                <Link href={montagePath(step.montageKey)}>{step.montageName ?? step.montageKey}</Link>
              )}
            </span>
            <span>{frames(step.from)}</span>
            <span>{leftAt(step)}</span>
            <span>{frames(step.nextStart)}</span>
          </Fragment>
        ))}
      </div>
      <div className="ce-summary">
        <span className="ce-stat">
          <span className="ce-label">Hard swap block</span>
          <span className="ce-stat-v">{swapBlock(ability.hardSwapStep, ability.hardSwapTime)}</span>
        </span>
        <span className="ce-stat">
          <span className="ce-label">Recommended swap block</span>
          <span className="ce-stat-v">
            {swapBlock(ability.recommendedSwapStep, ability.recommendedSwapTime)}
          </span>
        </span>
      </div>
    </>
  )
}
