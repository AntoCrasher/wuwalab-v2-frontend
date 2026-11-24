import type { Notify } from '@/lib/gameTypes'

export const KINDS = ['hit', 'skill_state', 'stop', 'tag', 'buff', 'other'] as const
export type Kind = (typeof KINDS)[number]

export const KIND_LABELS: Record<Kind, string> = {
  hit: 'Hits',
  skill_state: 'Skill state',
  stop: 'Stops',
  tag: 'Tags',
  buff: 'Buffs',
  other: 'Other',
}

const PREFIXES = ['TsAnimNotifyState', 'TsAnimNotify', 'AnimNotifyState', 'AnimNotify']
const BULLET_KEYS = ['子弹数据名', '子弹id数组', 'bulletName', 'BulletIds']
const SCALAR_LIMIT = 4

export function shortClass(notifyClass: string): string {
  const prefix = PREFIXES.find((candidate) => notifyClass.startsWith(candidate))
  if (prefix === undefined) {
    return notifyClass
  }
  return (prefix.includes('State') ? 'State' : '') + notifyClass.slice(prefix.length)
}

export function paramsOf(notify: Notify): Record<string, unknown> {
  return Array.isArray(notify.params) ? {} : notify.params
}

export function bulletIds(params: Record<string, unknown>): string[] {
  return BULLET_KEYS.flatMap((key) => {
    const value = params[key]
    if (Array.isArray(value)) {
      return value.map(String)
    }
    return value === undefined || value === null || value === '' ? [] : [String(value)]
  })
}

export function buffId(params: Record<string, unknown>): number | null {
  const value = params['BuffId']
  return typeof value === 'number' && value !== 0 ? value : null
}

export function tagName(params: Record<string, unknown>): string | null {
  for (const key of ['Tag', '事件Tag']) {
    const value = params[key]
    if (typeof value === 'object' && value !== null && 'TagName' in value) {
      const name = value.TagName
      if (typeof name === 'string' && name !== 'None') {
        return name
      }
    }
  }
  return null
}

export function scalars(params: Record<string, unknown>): string {
  return Object.entries(params)
    .filter(([, value]) => ['string', 'number', 'boolean'].includes(typeof value))
    .slice(0, SCALAR_LIMIT)
    .map(([key, value]) => `${key}=${String(value)}`)
    .join('  ')
}
