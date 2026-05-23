import { NextRequest, NextResponse } from 'next/server';
import { fetchCredits } from '@/lib/credits-api';
import type { CreditStatus } from '@/lib/types';

/**
 * GET /api/credits
 *
 * BFF endpoint para listar créditos.
 * Actualmente usa mock data. Cuando credits-service real exista,
 * credits-api.ts se actualizará para llamar al servicio real.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);

  const status = (searchParams.get('status') ?? 'todos') as CreditStatus | 'todos';
  const search = searchParams.get('search') ?? '';
  const cursor = searchParams.get('cursor') ?? undefined;
  const limit = Number(searchParams.get('limit') ?? '10');

  try {
    const result = await fetchCredits({ status, search, cursor, limit });
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch credits';
    return NextResponse.json(
      { statusCode: 500, message, timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}
