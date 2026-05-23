import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const token = request.cookies.get('access_token')?.value;

  if (!token) {
    return NextResponse.json(
      { statusCode: 401, message: 'Not authenticated', timestamp: new Date().toISOString() },
      { status: 401 }
    );
  }

  try {
    const user = await getAuthenticatedUser(token);
    return NextResponse.json(user);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Authentication failed';
    return NextResponse.json(
      { statusCode: 401, message, timestamp: new Date().toISOString() },
      { status: 401 }
    );
  }
}
