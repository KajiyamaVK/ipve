import { NextResponse, NextRequest } from 'next/server'
import { getEnv } from './envSchema'

export const config = {
  matcher: ['/', '/people', '/dashboard', '/people/:path*'],
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
  } else if (token && (pathname === '/login' || pathname === '/')) {
    return NextResponse.redirect(new URL(urls.dashboard, request.url))
  }

  try {
    getEnv()
  } catch (error) {
    console.error('Error parsing environment variables:', error)
    throw error
  }

  // return NextResponse.next()
}
