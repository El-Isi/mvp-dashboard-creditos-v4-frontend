"use client";

import type { CreditFilters, CreditStatus } from "@/lib/types";
import { getStatusLabel } from "@/lib/utils";

interface CreditFiltersBarProps {
  filters: CreditFilters;
  onFilterChange: (filters: Partial<CreditFilters>) => void;
}

const STATUSES: Array<CreditStatus | "todos"> = [
  "todos",
  "activo",
  "pendiente",
  "vencido",
  "liquidado",
  "rechazado",
];

export default function CreditFiltersBar({
  filters,
  onFilterChange,
}: CreditFiltersBarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-konfio-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        {STATUSES.map((status) => {
          const isActive = filters.status === status;
          return (
            <button
              key={status}
              onClick={() => onFilterChange({ status })}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-konfio-primary text-white shadow-sm"
                  : "bg-konfio-gray-100 text-konfio-gray-600 hover:bg-konfio-gray-200"
              }`}
            >
              {status === "todos" ? "Todos" : getStatusLabel(status)}
            </button>
          );
        })}
      </div>

      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-konfio-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          type="text"
          placeholder="Buscar por nombre, ID o email..."
          value={filters.search}
          onChange={(e) => onFilterChange({ search: e.target.value })}
          className="w-full rounded-lg border border-konfio-gray-300 py-2 pl-10 pr-4 text-sm text-konfio-gray-900 placeholder-konfio-gray-400 focus:border-konfio-secondary focus:outline-none focus:ring-1 focus:ring-konfio-secondary sm:w-72"
        />
      </div>
    </div>
  );
}
