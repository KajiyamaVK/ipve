import { NextResponse, NextRequest } from 'next/server'

export const config = {
  matcher: ['/', '/login', '/dashboard'],
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const urls = {
    login: new URL('/login', request.url),
    dashboard: new URL('/dashboard', request.url),
  }
  const token = request.cookies.get('ipve_auth_token')?.value
  console.log('ipve_auth_token', token)
  console.log('pathname', pathname)
  if (!token && pathname !== '/login') {
    console.log('url', urls.login)
    return NextResponse.redirect(new URL(urls.login, request.url))
  } else if (token && pathname === '/login') {
    console.log('url', urls.dashboard)
    return NextResponse.redirect(new URL(urls.dashboard, request.url))
  }
  console.log('11111111')
  // return NextResponse.next()
}
