import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

const ALLOWED_ADMIN_ROLES = ['superadmin', 'manager', 'viewer'] as const;

const PUBLIC_PATHS = [
  '/login',
  '/forgot-password',
  '/reset-password',
  '/api/auth/login',
  '/api/auth/logout',
  '/api/auth/callback',
  '/api/auth/refresh',
  '/api/auth/oauth',
  '/api/auth/forgot-password',
  '/api/auth/reset-password',
  '/favicon.ico',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublic = PUBLIC_PATHS.some((path) => pathname.startsWith(path)) || pathname.startsWith('/_next');

  if (isPublic) {
    return NextResponse.next();
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  const accessToken =
    request.cookies.get('sb-access-token')?.value ??
    (request.headers.get('authorization')?.startsWith('Bearer ')
      ? request.headers.get('authorization')?.slice(7)
      : null);

  const refreshToken = request.cookies.get('sb-refresh-token')?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const { data: userData, error: userError } = await supabase.auth.getUser(accessToken);

  if (userError && refreshToken) {
    try {
      const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession({
        refresh_token: refreshToken,
      });

      if (refreshError || !refreshData.session) {
        const redirectResponse = NextResponse.redirect(new URL('/login', request.url));
        redirectResponse.cookies.delete('sb-access-token');
        redirectResponse.cookies.delete('sb-refresh-token');
        return redirectResponse;
      }

      const { user } = refreshData.session;
      const { data: adminRecord } = await supabase
        .from('admins')
        .select('id, role')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!adminRecord || !ALLOWED_ADMIN_ROLES.includes(adminRecord.role as any)) {
        const redirectResponse = NextResponse.redirect(new URL('/login', request.url));
        redirectResponse.cookies.delete('sb-access-token');
        redirectResponse.cookies.delete('sb-refresh-token');
        return redirectResponse;
      }

      response.cookies.set('sb-access-token', refreshData.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60,
        path: '/',
      });
      response.cookies.set('sb-refresh-token', refreshData.session.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });
      return response;
    } catch (error) {
      console.error('Token refresh error in middleware:', error);
      const redirectResponse = NextResponse.redirect(new URL('/login', request.url));
      redirectResponse.cookies.delete('sb-access-token');
      redirectResponse.cookies.delete('sb-refresh-token');
      return redirectResponse;
    }
  }

  if (userError || !userData.user) {
    const redirectResponse = NextResponse.redirect(new URL('/login', request.url));
    redirectResponse.cookies.delete('sb-access-token');
    redirectResponse.cookies.delete('sb-refresh-token');
    return redirectResponse;
  }

  const { data: adminRecord } = await supabase
    .from('admins')
    .select('id, role')
    .eq('user_id', userData.user.id)
    .maybeSingle();

  if (!adminRecord || !ALLOWED_ADMIN_ROLES.includes(adminRecord.role as any)) {
    const redirectResponse = NextResponse.redirect(new URL('/login', request.url));
    redirectResponse.cookies.delete('sb-access-token');
    redirectResponse.cookies.delete('sb-refresh-token');
    return redirectResponse;
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
