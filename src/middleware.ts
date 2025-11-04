// middleware.ts

import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from "better-auth/cookies";

import {
  AUTH_ROUTES,
  DEFAULT_AUTHENTICATED_ROUTE
} from './lib/auth/constants/auth.constants';

const authRoutes = Object.values(AUTH_ROUTES);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = getSessionCookie(request);

  // 1. Redirect authenticated users away from auth pages
  if (sessionCookie && authRoutes.includes(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = DEFAULT_AUTHENTICATED_ROUTE;
    return NextResponse.redirect(url);
  }

  // 2. Redirect unauthenticated users away from protected pages
  if (!sessionCookie && !authRoutes.includes(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = AUTH_ROUTES.LOGIN;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configuration to run middleware on most paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};