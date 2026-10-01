export type ArticleSection = {
  title: string
  paragraphs: string[]
}

export type ArticleData = {
  intro: string
  sections: ArticleSection[]
  faq: { q: string; a: string }[]
}

export type ArticleRecord = Record<string, ArticleData>

export const ARTICLE_BATCH_CITIES = [
  'jakarta', 'surabaya', 'medan', 'semarang', 'palembang',
  'balikpapan', 'makassar', 'bandung', 'batam', 'pekanbaru',
  'yogyakarta', 'bogor', 'bekasi', 'tangerang', 'cilegon',
  'samarinda', 'pontianak', 'banjarmasin', 'manado', 'denpasar',
] as const

export type ArticleBatchCity = (typeof ARTICLE_BATCH_CITIES)[number]
