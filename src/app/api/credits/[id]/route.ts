import { NextRequest, NextResponse } from 'next/server';
import { fetchCreditById } from '@/lib/credits-api';

/**
 * GET /api/credits/:id
 *
 * BFF endpoint para detalle de crédito.
 * Actualmente usa mock data.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;

  try {
    const credit = await fetchCreditById(id);

    if (!credit) {
      return NextResponse.json(
        { statusCode: 404, message: `Credit ${id} not found`, timestamp: new Date().toISOString() },
        { status: 404 }
      );
    }

    return NextResponse.json(credit);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch credit';
    return NextResponse.json(
      { statusCode: 500, message, timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}
