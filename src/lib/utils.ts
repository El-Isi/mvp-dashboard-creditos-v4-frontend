import type { CreditStatus } from "./types";

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  if (dateStr === "-") return "-";
  const date = new Date(dateStr + "T00:00:00");
  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function getStatusLabel(status: CreditStatus): string {
  const labels: Record<CreditStatus, string> = {
    activo: "Activo",
    pendiente: "Pendiente",
    vencido: "Vencido",
    liquidado: "Liquidado",
    rechazado: "Rechazado",
  };
  return labels[status];
}

export function getStatusColor(status: CreditStatus): string {
  const colors: Record<CreditStatus, string> = {
    activo: "bg-green-100 text-green-800",
    pendiente: "bg-yellow-100 text-yellow-800",
    vencido: "bg-red-100 text-red-800",
    liquidado: "bg-blue-100 text-blue-800",
    rechazado: "bg-konfio-gray-100 text-konfio-gray-600",
  };
  return colors[status];
}
