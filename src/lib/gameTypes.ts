export type GameCharacter = {
  id: number
  folder: string
  element: number
  weaponType: number
  bodyType: string
  nameKey: string
  snapshot: string
  swapInGround: number | null
  swapInAir: number | null
}

export type MontageRef = { assetKey: string; name?: string; length?: number }

export type Skill = {
  id: number
  name: string
  mode: number
  genre: number
  skillGroup: number
  interruptLevel: number
  cooldownTime: number
  blueprint: string | null
  montages: MontageRef[]
  buffs: { role: string; buffId: number }[]
}

export type Notify = {
  position: number
  exportIndex: number | null
  notifyClass: string
  kind: string
  time: number
  duration: number
  params: Record<string, unknown> | unknown[]
}

export type Montage = {
  assetKey: string
  name: string
  length: number
  blendIn: number | null
  blendOut: number | null
  notifies: Notify[]
}

export type Damage = {
  id: number
  element?: number
  damageType?: number
  rateLv?: number[]
  energy?: number[]
  toughLv?: number[]
}

export type BulletChild = {
  position: number
  childId: number
  delay: number
  childCount: number
  spawnInterval: number
  triggerType: number
}

export type BulletBuff = { position: number; target: string; buffId: number }

export type Bullet = {
  id: number
  name: string
  sourceTable: string
  damages: Damage[]
  children: BulletChild[]
  buffs: BulletBuff[]
} & Record<string, unknown>

export type GameRow = { id: number; raw: unknown } & Record<string, unknown>
