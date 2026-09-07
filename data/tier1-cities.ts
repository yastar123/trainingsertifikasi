export const TIER1_CITY_SLUGS = [
  'jakarta', 'surabaya', 'medan', 'semarang', 'palembang',
  'balikpapan', 'makassar', 'bandung', 'batam', 'pekanbaru',
  'yogyakarta', 'bogor', 'bekasi', 'tangerang', 'cilegon',
  'samarinda', 'pontianak', 'banjarmasin', 'manado', 'denpasar',
] as const

export type Tier1CitySlug = (typeof TIER1_CITY_SLUGS)[number]

export const TIER1_CITY_SET = new Set<string>(TIER1_CITY_SLUGS)
