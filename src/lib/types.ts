export type CreditStatus =
  | "activo"
  | "pendiente"
  | "vencido"
  | "liquidado"
  | "rechazado";

export interface Credit {
  id: string;
  clientName: string;
  clientEmail: string;
  amount: number;
  remainingBalance: number;
  interestRate: number;
  term: number;
  status: CreditStatus;
  createdAt: string;
  nextPaymentDate: string;
}

export interface CreditFilters {
  status: CreditStatus | "todos";
  search: string;
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
}
