import { NextRequest, NextResponse } from 'next/server';
import { logout } from '@/lib/auth';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const token = request.cookies.get('access_token')?.value;

  if (token) {
    try {
      await logout(token);
    } catch {
      // Silently fail — we clear cookies regardless
    }
  }

  const response = NextResponse.json({ message: 'Logged out' });
  response.cookies.delete('access_token');
  response.cookies.delete('refresh_token');

  return response;
}
