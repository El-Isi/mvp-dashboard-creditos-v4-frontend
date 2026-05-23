/**
 * Auth client — Integración real con auth-service de Konfío
 * Base URL: https://auth.konfio.mx/api/v1
 */

interface LoginRequest {
  email: string;
  password: string;
}

interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

const AUTH_BASE_URL = process.env.AUTH_SERVICE_URL;
const AUTH_API_KEY = process.env.AUTH_SERVICE_API_KEY;

function getAuthHeaders(token?: string): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'x-api-key': AUTH_API_KEY ?? '',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export async function login(credentials: LoginRequest): Promise<AuthTokens> {
  const response = await fetch(`${AUTH_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      (error as { message?: string }).message ?? `Login failed with status ${response.status}`
    );
  }

  return response.json() as Promise<AuthTokens>;
}

export async function refreshToken(refresh_token: string): Promise<AuthTokens> {
  const response = await fetch(`${AUTH_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ refresh_token }),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  return response.json() as Promise<AuthTokens>;
}

export async function logout(token: string): Promise<void> {
  await fetch(`${AUTH_BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: getAuthHeaders(token),
  });
}

export async function getAuthenticatedUser(token: string): Promise<AuthUser> {
  const response = await fetch(`${AUTH_BASE_URL}/auth/me`, {
    method: 'GET',
    headers: getAuthHeaders(token),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch authenticated user');
  }

  return response.json() as Promise<AuthUser>;
}
