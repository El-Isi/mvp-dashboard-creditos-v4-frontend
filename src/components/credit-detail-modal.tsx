"use client";

import { useEffect } from "react";
import type { Credit } from "@/lib/types";
import {
  formatCurrency,
  formatDate,
  getStatusLabel,
  getStatusColor,
} from "@/lib/utils";

interface CreditDetailModalProps {
  credit: Credit;
  onClose: () => void;
}

export default function CreditDetailModal({
  credit,
  onClose,
}: CreditDetailModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const progressPercent =
    credit.amount > 0
      ? Math.round(
          ((credit.amount - credit.remainingBalance) / credit.amount) * 100
        )
      : 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-konfio-gray-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-konfio-gray-900">
              Detalle del Crédito
            </h2>
            <p className="text-sm font-mono text-konfio-primary">
              {credit.id}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-konfio-gray-400 transition-colors hover:bg-konfio-gray-100 hover:text-konfio-gray-600"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="space-y-5 px-6 py-5">
          {/* Client info */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-konfio-primary text-sm font-bold text-white">
              {credit.clientName
                .split(" ")
                .slice(0, 2)
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <p className="font-semibold text-konfio-gray-900">
                {credit.clientName}
              </p>
              <p className="text-sm text-konfio-gray-500">
                {credit.clientEmail}
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-konfio-gray-500">Estado:</span>
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                credit.status
              )}`}
            >
              {getStatusLabel(credit.status)}
            </span>
          </div>

          {/* Progress bar */}
          <div>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="text-konfio-gray-500">Progreso de pago</span>
              <span className="font-semibold text-konfio-gray-900">
                {progressPercent}%
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-konfio-gray-200">
              <div
                className="h-full rounded-full bg-konfio-secondary transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-4">
            <DetailItem
              label="Monto Original"
              value={formatCurrency(credit.amount)}
            />
            <DetailItem
              label="Saldo Restante"
              value={formatCurrency(credit.remainingBalance)}
            />
            <DetailItem
              label="Tasa de Interés"
              value={`${credit.interestRate.toFixed(1)}%`}
            />
            <DetailItem
              label="Plazo"
              value={`${credit.term} meses`}
            />
            <DetailItem
              label="Fecha de Inicio"
              value={formatDate(credit.createdAt)}
            />
            <DetailItem
              label="Próximo Pago"
              value={formatDate(credit.nextPaymentDate)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-konfio-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg bg-konfio-primary px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-konfio-secondary focus:ring-offset-1"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

interface DetailItemProps {
  label: string;
  value: string;
}

function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div className="rounded-lg bg-konfio-gray-50 p-3">
      <p className="text-xs text-konfio-gray-500">{label}</p>
      <p className="mt-0.5 text-sm font-semibold text-konfio-gray-900">
        {value}
      </p>
    </div>
  );
}
