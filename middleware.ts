import { NextRequest, NextResponse } from 'next/server'
import { cityBySlug } from '@/data/cities'
import { TIER1_CITY_SET } from '@/data/tier1-cities'
import { cityFromHost } from '@/lib/constants'
import { isThinCityArticle } from '@/data/articles/thin-page-rules'

export function middleware(request: NextRequest) {
  const slug = cityFromHost(request.headers.get('host') ?? '')
  if (request.nextUrl.pathname.startsWith('/_next') || request.nextUrl.pathname.includes('.')) return NextResponse.next()
  const articleIndexMatch = request.nextUrl.pathname.match(/^\/([^/]+)\/artikel\/?$/)
  if (articleIndexMatch && cityBySlug.has(articleIndexMatch[1])) return NextResponse.next()

  const articleMatch = request.nextUrl.pathname.match(/^\/([^/]+)\/artikel\/([^/]+)\/?$/)
  if (articleMatch && cityBySlug.has(articleMatch[1]) && (isThinCityArticle(articleMatch[1], articleMatch[2]) || !TIER1_CITY_SET.has(articleMatch[1]))) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = isThinCityArticle(articleMatch[1], articleMatch[2])
      ? `/layanan/artikel/${articleMatch[2]}`
      : `/${articleMatch[1]}`
    redirectUrl.hash = isThinCityArticle(articleMatch[1], articleMatch[2]) ? '' : 'pelatihan'
    return NextResponse.redirect(redirectUrl, 308)
  }
  if (!slug) return NextResponse.next()
  const url = request.nextUrl.clone()
  const hostArticlePath = request.nextUrl.pathname.match(/^\/artikel(?:\/[^/]+)?\/?$/)
  url.pathname = cityBySlug.has(slug)
    ? hostArticlePath ? `/${slug}${request.nextUrl.pathname}` : `/${slug}`
    : `/_missing-city/${slug}`
  return NextResponse.rewrite(url)
}

export const config = { matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'] }
