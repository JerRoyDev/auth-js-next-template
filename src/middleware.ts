// middleware.ts

import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from "better-auth/cookies";

import {
  AUTH_ROUTES,
  PROTECTED_ROUTES,
  PUBLIC_ROUTES
} from './lib/auth/constants/auth.constants';

const authRoutes = Object.values(AUTH_ROUTES);
const publicRoutes = Object.values(PUBLIC_ROUTES);
const protectedRoutes = Object.values(PROTECTED_ROUTES);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = getSessionCookie(request);

  // 1. Redirect authenticated users away from auth pages
  if (sessionCookie && authRoutes.includes(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = PROTECTED_ROUTES.USER_LANDING || "/";
    return NextResponse.redirect(url);
  }

  // 2. Redirect unauthenticated users away from protected pages, EXCEPT public routes
  if (
    !sessionCookie &&
    !authRoutes.includes(pathname) &&
    protectedRoutes.includes(pathname) &&
    !publicRoutes.includes(pathname)
  ) {
    const url = request.nextUrl.clone();
    url.pathname = AUTH_ROUTES.LOGIN;
    return NextResponse.redirect(url);
  }

  // 3. Allow everything else (including public routes)
  return NextResponse.next();
}

// Configuration to run middleware on most paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};