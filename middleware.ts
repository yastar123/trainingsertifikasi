import { NextRequest, NextResponse } from 'next/server'
import { cityBySlug } from '@/data/cities'
import { cityFromHost } from '@/lib/constants'

export function middleware(request: NextRequest) {
  const slug = cityFromHost(request.headers.get('host') ?? '')
  if (request.nextUrl.pathname.startsWith('/_next') || request.nextUrl.pathname.includes('.')) return NextResponse.next()

  const canonicalArticleMatch = request.nextUrl.pathname.match(/^(?:\/([^/]+))?\/layanan\/artikel(?:\/([^/]+))?\/?$/)
  if (canonicalArticleMatch) {
    const canonicalUrl = request.nextUrl.clone()
    canonicalUrl.pathname = `/layanan/artikel${canonicalArticleMatch[2] ? `/${canonicalArticleMatch[2]}` : ''}`
    return NextResponse.rewrite(canonicalUrl)
  }

  const articleIndexMatch = request.nextUrl.pathname.match(/^\/([^/]+)\/artikel\/?$/)
  if (articleIndexMatch && cityBySlug.has(articleIndexMatch[1])) return NextResponse.next()

  const articleMatch = request.nextUrl.pathname.match(/^\/([^/]+)\/artikel\/([^/]+)\/?$/)
  if (articleMatch && cityBySlug.has(articleMatch[1])) return NextResponse.next()
  if (!slug) return NextResponse.next()
  const url = request.nextUrl.clone()
  const hostArticlePath = request.nextUrl.pathname.match(/^\/artikel(?:\/[^/]+)?\/?$/)
  url.pathname = cityBySlug.has(slug)
    ? hostArticlePath ? `/${slug}${request.nextUrl.pathname}` : `/${slug}`
    : `/_missing-city/${slug}`
  return NextResponse.rewrite(url)
}

export const config = { matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'] }
