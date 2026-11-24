export type TermListKey =
  'element' | 'weapon_type' | 'damage_type' | 'damage_subtype' | 'scaling' | 'skill_genre'

export type Term = { id: number; name: string; color: string; defaultColor: string }

export type TermList = { list: TermListKey; name: string; terms: Term[] }

export function findTerm(lists: TermList[], list: TermListKey, id: number): Term | null {
  return lists.find((group) => group.list === list)?.terms.find((term) => term.id === id) ?? null
}

export function tone(color: string): { color: string; backgroundColor: string } {
  return { color, backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)` }
}
