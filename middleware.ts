import { NextRequest, NextResponse } from 'next/server'
import { cityBySlug } from '@/data/cities'
import { cityFromHost, districtFromHost, slugify } from '@/lib/constants'
import { districtsForCity } from '@/data/districts'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') ?? ''
  const slug = cityFromHost(host)
  const districtSlug = districtFromHost(host)
  if (request.nextUrl.pathname.startsWith('/_next') || request.nextUrl.pathname.includes('.')) return NextResponse.next()

  if (districtSlug && slug && cityBySlug.has(slug)) {
    const districtExists = districtsForCity(slug, cityBySlug.get(slug)?.name ?? slug).some((district) => slugify(district.name).replace(/^kecamatan-/, '') === districtSlug)
    if (districtExists) {
      const districtPath = request.nextUrl.pathname.match(/^(?:\/[^/]+)?\/artikel(\/[^/]*)?\/?$/)
      const districtUrl = request.nextUrl.clone()
      districtUrl.pathname = districtPath ? `/${slug}/artikel${districtPath[1] ?? ''}` : `/${slug}`
      districtUrl.searchParams.set('district', districtSlug)
      return NextResponse.rewrite(districtUrl)
    }
  }

  const canonicalArticleMatch = request.nextUrl.pathname.match(/^(?:\/([^/]+))?\/layanan\/artikel(?:\/([^/]+))?\/?$/)
  if (canonicalArticleMatch) {
    const canonicalUrl = request.nextUrl.clone()
    canonicalUrl.pathname = `/layanan/artikel${canonicalArticleMatch[2] ? `/${canonicalArticleMatch[2]}` : ''}`
    return NextResponse.rewrite(canonicalUrl)
  }

  const articlePathMatch = request.nextUrl.pathname.match(/^\/([^/]+)\/artikel(\/[^/]*)?\/?$/)
  if (slug && articlePathMatch && cityBySlug.has(slug) && articlePathMatch[1] !== slug) {
    const canonicalUrl = request.nextUrl.clone()
    canonicalUrl.pathname = `/${slug}/artikel${articlePathMatch[2] ?? ''}`
    return NextResponse.redirect(canonicalUrl, 308)
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
