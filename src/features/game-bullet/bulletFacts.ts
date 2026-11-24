import { frames, plain } from '@/lib/gameFormat'
import type { Bullet } from '@/lib/gameTypes'
import type { Fact } from '@/ui'

function time(bullet: Bullet, field: string): string {
  const value = bullet[field]
  return typeof value === 'number' && value >= 0 ? `${frames(value)}  (${value} s)` : plain(value)
}

function vector(bullet: Bullet, prefix: string): string {
  return ['X', 'Y', 'Z'].map((axis) => plain(bullet[`${prefix}${axis}`])).join(' / ')
}

function hitstop(bullet: Bullet, who: string): string {
  const length = bullet[`${who}StopLength`]
  const stop = typeof length === 'number' ? frames(length) : plain(length)
  return `${stop} at ${plain(bullet[`${who}StopValue`])}, priority ${plain(bullet[`${who}StopPriority`])}`
}

export function timingFacts(bullet: Bullet): Fact[] {
  return [
    { label: 'Lifetime', value: time(bullet, 'lifetime') },
    { label: 'Collision delay', value: time(bullet, 'collisionDelay') },
    { label: 'Collision length', value: time(bullet, 'collisionLength') },
    { label: 'Hit interval', value: time(bullet, 'hitInterval') },
    { label: 'Hits per target', value: plain(bullet['hitsPerTarget']) },
    { label: 'Total hits', value: plain(bullet['totalHits']) },
    { label: 'Targets', value: plain(bullet['targets']) },
    { label: 'Interval per target', value: plain(bullet['intervalPerTarget']) },
    { label: 'Attacker hitstop', value: hitstop(bullet, 'attacker') },
    { label: 'Victim hitstop', value: hitstop(bullet, 'victim') },
    { label: 'Hitstop follows attacker', value: plain(bullet['stopFollowsAttacker']) },
    { label: 'Destroyed on skill end', value: plain(bullet['destroyOnSkillEnd']) },
  ]
}

export function shapeFacts(bullet: Bullet): Fact[] {
  return [
    { label: 'Shape', value: plain(bullet['shape']) },
    { label: 'Half size X / Y / Z', value: vector(bullet, 'size') },
    { label: 'Birth base', value: plain(bullet['birthBase']) },
    { label: 'Birth offset', value: vector(bullet, 'birthOffset') },
    { label: 'Birth limit', value: vector(bullet, 'birthLimit') },
    { label: 'Speed', value: plain(bullet['speed']) },
    { label: 'Follow', value: plain(bullet['follow']) },
    { label: 'Trajectory', value: plain(bullet['trajectory']) },
    { label: 'Move target', value: plain(bullet['moveTarget']) },
    { label: 'Logic preset', value: plain(bullet['logicPreset']) },
  ]
}
