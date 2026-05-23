"use client";

import { useState, useMemo, useCallback } from "react";
import type { Credit, CreditStatus, CreditFilters, PaginationState } from "@/lib/types";
import { INITIAL_CREDITS } from "@/lib/data";
import CreditFiltersBar from "@/components/credit-filters-bar";
import CreditTable from "@/components/credit-table";
import CreditDetailModal from "@/components/credit-detail-modal";
import Pagination from "@/components/pagination";
import SummaryCards from "@/components/summary-cards";

const PAGE_SIZE = 5;

export default function CreditDashboard() {
  const [credits] = useState<Credit[]>(INITIAL_CREDITS);
  const [filters, setFilters] = useState<CreditFilters>({
    status: "todos",
    search: "",
  });
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    pageSize: PAGE_SIZE,
    totalItems: 0,
  });
  const [selectedCredit, setSelectedCredit] = useState<Credit | null>(null);

  const filteredCredits = useMemo(() => {
    return credits.filter((credit) => {
      const matchesStatus =
        filters.status === "todos" || credit.status === filters.status;
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        !filters.search ||
        credit.clientName.toLowerCase().includes(searchLower) ||
        credit.id.toLowerCase().includes(searchLower) ||
        credit.clientEmail.toLowerCase().includes(searchLower);
      return matchesStatus && matchesSearch;
    });
  }, [credits, filters]);

  const paginatedCredits = useMemo(() => {
    const start = (pagination.currentPage - 1) * pagination.pageSize;
    return filteredCredits.slice(start, start + pagination.pageSize);
  }, [filteredCredits, pagination.currentPage, pagination.pageSize]);

  const totalPages = Math.ceil(filteredCredits.length / pagination.pageSize);

  const handleFilterChange = useCallback(
    (newFilters: Partial<CreditFilters>) => {
      setFilters((prev) => ({ ...prev, ...newFilters }));
      setPagination((prev) => ({ ...prev, currentPage: 1 }));
    },
    []
  );

  const handlePageChange = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  }, []);

  const handleSelectCredit = useCallback((credit: Credit) => {
    setSelectedCredit(credit);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedCredit(null);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-konfio-gray-900">
          Dashboard de Créditos
        </h1>
        <p className="mt-1 text-sm text-konfio-gray-500">
          Gestiona y consulta el estado de los créditos de tus clientes.
        </p>
      </div>

      <SummaryCards credits={credits} />

      <CreditFiltersBar filters={filters} onFilterChange={handleFilterChange} />

      <CreditTable
        credits={paginatedCredits}
        onSelectCredit={handleSelectCredit}
      />

      {filteredCredits.length > PAGE_SIZE && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={totalPages}
          totalItems={filteredCredits.length}
          pageSize={pagination.pageSize}
          onPageChange={handlePageChange}
        />
      )}

      {filteredCredits.length === 0 && (
        <div className="rounded-lg border border-konfio-gray-200 bg-white py-12 text-center">
          <svg
            className="mx-auto h-12 w-12 text-konfio-gray-400"
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
          <h3 className="mt-2 text-sm font-semibold text-konfio-gray-900">
            Sin resultados
          </h3>
          <p className="mt-1 text-sm text-konfio-gray-500">
            No se encontraron créditos con los filtros seleccionados.
          </p>
        </div>
      )}

      {selectedCredit && (
        <CreditDetailModal
          credit={selectedCredit}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
