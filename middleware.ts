import { NextRequest, NextResponse } from 'next/server'
import { cityBySlug } from '@/data/cities'
import { cityFromHost } from '@/lib/constants'

export function middleware(request: NextRequest) {
  const slug = cityFromHost(request.headers.get('host') ?? '')
  if (!slug || !cityBySlug.has(slug) || request.nextUrl.pathname.startsWith('/_next') || request.nextUrl.pathname.includes('.')) return NextResponse.next()
  const url = request.nextUrl.clone()
  url.pathname = `/${slug}`
  return NextResponse.rewrite(url)
}

export const config = { matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'] }
