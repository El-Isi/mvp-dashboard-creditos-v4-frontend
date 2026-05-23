import { NextRequest, NextResponse } from 'next/server';
import { refreshToken } from '@/lib/auth';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const refresh = request.cookies.get('refresh_token')?.value;

  if (!refresh) {
    return NextResponse.json(
      { statusCode: 401, message: 'No refresh token', timestamp: new Date().toISOString() },
      { status: 401 }
    );
  }

  try {
    const tokens = await refreshToken(refresh);

    const response = NextResponse.json({ message: 'Token refreshed' });
    response.cookies.set('access_token', tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60,
    });
    response.cookies.set('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Refresh failed';
    return NextResponse.json(
      { statusCode: 401, message, timestamp: new Date().toISOString() },
      { status: 401 }
    );
  }
}
