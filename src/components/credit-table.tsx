"use client";

import type { Credit } from "@/lib/types";
import { formatCurrency, formatDate, getStatusLabel, getStatusColor } from "@/lib/utils";

interface CreditTableProps {
  credits: Credit[];
  onSelectCredit: (credit: Credit) => void;
}

export default function CreditTable({
  credits,
  onSelectCredit,
}: CreditTableProps) {
  if (credits.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-lg border border-konfio-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-konfio-gray-200">
          <thead className="bg-konfio-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-konfio-gray-500">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-konfio-gray-500">
                Cliente
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-konfio-gray-500">
                Monto
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-konfio-gray-500">
                Saldo
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-konfio-gray-500">
                Tasa
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-konfio-gray-500">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-konfio-gray-500">
                Próximo Pago
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-konfio-gray-500">
                Acción
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-konfio-gray-100">
            {credits.map((credit) => (
              <tr
                key={credit.id}
                className="transition-colors hover:bg-konfio-gray-50"
              >
                <td className="whitespace-nowrap px-4 py-3 text-sm font-mono font-medium text-konfio-primary">
                  {credit.id}
                </td>
                <td className="px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-konfio-gray-900">
                      {credit.clientName}
                    </p>
                    <p className="text-xs text-konfio-gray-500">
                      {credit.clientEmail}
                    </p>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-konfio-gray-700">
                  {formatCurrency(credit.amount)}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-konfio-gray-900">
                  {formatCurrency(credit.remainingBalance)}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-konfio-gray-700">
                  {credit.interestRate.toFixed(1)}%
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(
                      credit.status
                    )}`}
                  >
                    {getStatusLabel(credit.status)}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-konfio-gray-700">
                  {formatDate(credit.nextPaymentDate)}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  <button
                    onClick={() => onSelectCredit(credit)}
                    className="rounded-md bg-konfio-primary px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-konfio-secondary focus:ring-offset-1"
                  >
                    Ver detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
