import { k3ListrikArticles } from './k3-listrik.ts'
import { smk3Articles } from './smk3.ts'

export const THIN_LOCAL_WORD_THRESHOLD = 60

function localWordCount(article: { intro: string; sections: { paragraphs: string[] }[] }) {
  return [article.intro, ...article.sections.slice(0, 2).flatMap((section) => section.paragraphs)]
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
}

export const cityArticleLocalWordCounts = {
  'operator-lifter-manlift-boomlift-scissor-lift': Object.fromEntries(Object.keys(k3ListrikArticles).map((city) => [city, 0])),
  'operator-pallet-mover-liftstacker-reachstacker': Object.fromEntries(Object.keys(k3ListrikArticles).map((city) => [city, 0])),
  'operator-tower-crane': Object.fromEntries(Object.keys(k3ListrikArticles).map((city) => [city, 0])),
  'operator-overhead-crane-mobile-crane-pedestal-crane': Object.fromEntries(Object.keys(k3ListrikArticles).map((city) => [city, 0])),
  'operator-pita-transport-conveyor-kompressor': Object.fromEntries(Object.keys(k3ListrikArticles).map((city) => [city, 0])),
  'operator-alat-berat-excavator-bulldozer-vibro-dump-truck-wheel-loader': Object.fromEntries(Object.keys(k3ListrikArticles).map((city) => [city, 0])),
  'operator-gondola': Object.fromEntries(Object.keys(k3ListrikArticles).map((city) => [city, 0])),
  'operator-forklift': Object.fromEntries(Object.keys(k3ListrikArticles).map((city) => [city, 0])),
  'rigger-juru-ikat': Object.fromEntries(Object.keys(k3ListrikArticles).map((city) => [city, 0])),
  'operator-k3-cargo-hoist-crane-kelas-3-lift-barang': Object.fromEntries(Object.keys(k3ListrikArticles).map((city) => [city, 0])),
  'lift-eskalator': Object.fromEntries(Object.keys(k3ListrikArticles).map((city) => [city, 0])),
  'operator-genset': Object.fromEntries(Object.keys(k3ListrikArticles).map((city) => [city, 0])),
  'k3-listrik': Object.fromEntries(Object.entries(k3ListrikArticles).map(([city, article]) => [city, localWordCount(article)])),
  smk3: Object.fromEntries(Object.entries(smk3Articles).map(([city, article]) => [city, localWordCount(article)])),
} as const

export const thinCityArticleKeys = new Set(
  Object.entries(cityArticleLocalWordCounts).flatMap(([service, counts]) =>
    Object.entries(counts)
      .filter(([, count]) => count < THIN_LOCAL_WORD_THRESHOLD)
      .map(([city]) => `${city}:${service}`),
  ),
)

export function isThinCityArticle(city: string, service: string) {
  return thinCityArticleKeys.has(`${city}:${service}`)
}
