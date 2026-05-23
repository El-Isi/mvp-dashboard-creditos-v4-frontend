/**
 * Credits API client
 *
 * GAP: No existe un credits-service real en Konfío.
 * Este archivo usa datos mock de src/lib/data.ts como fallback.
 *
 * Cuando el servicio esté disponible:
 * 1. Configurar CREDITS_SERVICE_URL y CREDITS_SERVICE_API_KEY en .env
 * 2. Descomentar las implementaciones reales abajo
 * 3. Eliminar las importaciones de datos mock
 */

import type { Credit, CreditStatus } from './types';
import { INITIAL_CREDITS } from './data';

interface CreditListParams {
  status?: CreditStatus | 'todos';
  search?: string;
  cursor?: string;
  limit?: number;
}

interface CreditListResponse {
  data: Credit[];
  nextCursor: string | null;
  total: number;
}

// const CREDITS_BASE_URL = process.env.CREDITS_SERVICE_URL;
// const CREDITS_API_KEY = process.env.CREDITS_SERVICE_API_KEY;

/**
 * Listar créditos con filtros y paginación.
 *
 * TODO: Reemplazar con llamada real cuando credits-service exista.
 * El servicio real debería seguir el patrón cursor-based de Konfío:
 *   GET /credits?cursor=<id>&limit=20&status=activo&search=query
 *   Response: { data: Credit[], nextCursor: string | null, total: number }
 */
export async function fetchCredits(
  params: CreditListParams
): Promise<CreditListResponse> {
  // --- IMPLEMENTACIÓN REAL (descomentar cuando el servicio exista) ---
  // const url = new URL(`${CREDITS_BASE_URL}/credits`);
  // if (params.cursor) url.searchParams.set('cursor', params.cursor);
  // if (params.limit) url.searchParams.set('limit', String(params.limit));
  // if (params.status && params.status !== 'todos') url.searchParams.set('status', params.status);
  // if (params.search) url.searchParams.set('search', params.search);
  //
  // const response = await fetch(url.toString(), {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //     'x-api-key': CREDITS_API_KEY ?? '',
  //   },
  // });
  //
  // if (!response.ok) {
  //   throw new Error(`Failed to fetch credits: ${response.status}`);
  // }
  //
  // return response.json() as Promise<CreditListResponse>;

  // --- MOCK FALLBACK ---
  const limit = params.limit ?? 10;
  let filtered = [...INITIAL_CREDITS];

  if (params.status && params.status !== 'todos') {
    filtered = filtered.filter((c) => c.status === params.status);
  }

  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.clientName.toLowerCase().includes(searchLower) ||
        c.id.toLowerCase().includes(searchLower)
    );
  }

  const cursorIndex = params.cursor
    ? filtered.findIndex((c) => c.id === params.cursor) + 1
    : 0;

  const page = filtered.slice(cursorIndex, cursorIndex + limit);
  const nextItem = filtered[cursorIndex + limit];

  return {
    data: page,
    nextCursor: nextItem ? nextItem.id : null,
    total: filtered.length,
  };
}

/**
 * Obtener detalle de un crédito por ID.
 *
 * TODO: Reemplazar con llamada real cuando credits-service exista.
 * El servicio real debería responder en:
 *   GET /credits/:id
 *   Response: Credit
 */
export async function fetchCreditById(
  creditId: string
): Promise<Credit | null> {
  // --- IMPLEMENTACIÓN REAL (descomentar cuando el servicio exista) ---
  // const response = await fetch(`${CREDITS_BASE_URL}/credits/${creditId}`, {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //     'x-api-key': CREDITS_API_KEY ?? '',
  //   },
  // });
  //
  // if (response.status === 404) return null;
  // if (!response.ok) {
  //   throw new Error(`Failed to fetch credit ${creditId}: ${response.status}`);
  // }
  //
  // return response.json() as Promise<Credit>;

  // --- MOCK FALLBACK ---
  const credit = INITIAL_CREDITS.find((c) => c.id === creditId);
  return credit ?? null;
}

/**
 * Obtener resumen/estadísticas del portafolio.
 *
 * TODO: Reemplazar con endpoint real cuando credits-service exista.
 */
export interface PortfolioSummary {
  totalCredits: number;
  activeCredits: number;
  overdueCredits: number;
  totalPortfolioAmount: number;
}

export async function fetchPortfolioSummary(): Promise<PortfolioSummary> {
  // --- MOCK FALLBACK ---
  const active = INITIAL_CREDITS.filter((c) => c.status === 'activo');
  const overdue = INITIAL_CREDITS.filter((c) => c.status === 'vencido');
  const portfolioCredits = INITIAL_CREDITS.filter(
    (c) => c.status === 'activo' || c.status === 'pendiente'
  );

  return {
    totalCredits: INITIAL_CREDITS.length,
    activeCredits: active.length,
    overdueCredits: overdue.length,
    totalPortfolioAmount: portfolioCredits.reduce(
      (sum, c) => sum + c.remainingBalance,
      0
    ),
  };
}
