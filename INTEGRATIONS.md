# Integraciones — Dashboard Créditos v4

## Resumen

Este documento describe las integraciones con servicios reales de Konfío y los gaps identificados en el MVP "Dashboard Créditos v4".

---

## Integraciones exitosas

### 1. auth-service (Autenticación)

| Campo | Valor |
|---|---|
| **Servicio** | auth-service |
| **Base URL** | `https://auth.konfio.mx/api/v1` |
| **Estado** | ✅ Integrado |
| **Archivo** | `src/lib/auth.ts` |

**Endpoints utilizados:**

| Método | Path | Uso en el MVP |
|---|---|---|
| `POST` | `/auth/login` | Login del asesor con email y password |
| `POST` | `/auth/refresh` | Renovar access token expirado |
| `POST` | `/auth/logout` | Cerrar sesión del asesor |
| `GET` | `/auth/me` | Obtener datos del asesor autenticado |

**Variables de entorno:**
- `AUTH_SERVICE_URL` — URL base del auth-service
- `AUTH_SERVICE_API_KEY` — API key para el auth-service

**Patrón de autenticación:**
```typescript
const response = await fetch(`${process.env.AUTH_SERVICE_URL}/auth/me`, {
  headers: {
    Authorization: `Bearer ${token}`,
    'x-api-key': process.env.AUTH_SERVICE_API_KEY,
  },
});
```

---

## Gaps identificados

### 1. ❌ credits-service (Servicio de Créditos)

| Campo | Valor |
|---|---|
| **Funcionalidad requerida** | Listar créditos paginados, filtrar por status, obtener detalle de crédito |
| **Estado** | ❌ No existe servicio real disponible |
| **Workaround actual** | Mock con datos hardcodeados en `src/lib/data.ts` |

**Endpoints que se necesitarían:**

| Método | Path | Descripción |
|---|---|---|
| `GET` | `/credits?cursor=<id>&limit=20&status=<status>&search=<query>` | Listar créditos paginados con filtros |
| `GET` | `/credits/:id` | Obtener detalle de un crédito |
| `GET` | `/credits/summary` | Obtener estadísticas resumidas del portafolio |

**Variables de entorno necesarias (cuando exista):**
- `CREDITS_SERVICE_URL`
- `CREDITS_SERVICE_API_KEY`

**Archivos afectados:**
- `src/lib/data.ts` — Contiene datos mock que deberán ser reemplazados
- `src/lib/credits-api.ts` — Cliente API preparado con mock fallback
- `src/components/credit-dashboard.tsx` — Actualmente usa datos en memoria; debe migrar a fetch real

> **Nota:** El archivo `src/lib/credits-api.ts` ya incluye la estructura preparada para conectar con un servicio real de créditos. Cuando el servicio esté disponible, solo se necesita:
> 1. Configurar las variables de entorno `CREDITS_SERVICE_URL` y `CREDITS_SERVICE_API_KEY`
> 2. Descomentar las llamadas reales en `credits-api.ts`
> 3. Eliminar los datos mock de `src/lib/data.ts`

### 2. ℹ️ notification-service (Notificaciones) — No utilizado

| Campo | Valor |
|---|---|
| **Servicio** | notification-service |
| **Base URL** | `https://notifications.konfio.mx/api/v1` |
| **Estado** | ℹ️ Disponible pero no requerido por este MVP |

El servicio de notificaciones está disponible pero no se identificó un caso de uso directo en el alcance actual del Dashboard de Créditos. Podría usarse en futuras iteraciones para:
- Notificar asesores sobre créditos próximos a vencer
- Enviar alertas de créditos vencidos por email/SMS

---

## Arquitectura de integración

```
┌─────────────────────┐
│   Next.js Frontend  │
│  (Dashboard UI)     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐     ┌──────────────────────┐
│  Next.js API Routes │────▶│  auth-service         │ ✅ Real
│  (BFF Layer)        │     │  auth.konfio.mx       │
└──────────┬──────────┘     └──────────────────────┘
           │
           ▼
┌─────────────────────┐
│  credits-service    │ ❌ Mock (no existe aún)
│  (datos mock)       │
└─────────────────────┘
```

---

## Checklist de migración a producción

- [x] Autenticación conectada a auth-service real
- [ ] Reemplazar mock de créditos con credits-service real
- [ ] Migrar paginación offset-based a cursor-based (patrón Konfío)
- [ ] Agregar manejo de errores con HttpExceptionFilter
- [ ] Configurar variables de entorno en plataforma de deploy
