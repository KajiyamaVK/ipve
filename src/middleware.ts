import { NextResponse, NextRequest } from 'next/server'

export const config = {
  matcher: ['/'],
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const urls = {
    login: new URL('/login', request.url),
    dashboard: new URL('/dashboard', request.url),
  }
  const token = request.cookies.get('ipve_auth_token')?.value

  if (!token && pathname !== '/login') {
    return NextResponse.redirect(new URL(urls.login, request.url))
  } else if (token) {
    return NextResponse.redirect(new URL(urls.dashboard, request.url))
  }

  // return NextResponse.next()
}
