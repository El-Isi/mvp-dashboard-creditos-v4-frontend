"use client";

import type { Credit } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

interface SummaryCardsProps {
  credits: Credit[];
}

export default function SummaryCards({ credits }: SummaryCardsProps) {
  const totalCredits = credits.length;
  const activeCredits = credits.filter((c) => c.status === "activo").length;
  const overdueCredits = credits.filter((c) => c.status === "vencido").length;
  const totalPortfolio = credits
    .filter((c) => c.status === "activo" || c.status === "vencido")
    .reduce((sum, c) => sum + c.remainingBalance, 0);

  const cards = [
    {
      label: "Total Créditos",
      value: totalCredits.toString(),
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
        </svg>
      ),
      color: "text-konfio-primary",
      bgColor: "bg-blue-50",
    },
    {
      label: "Créditos Activos",
      value: activeCredits.toString(),
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "text-konfio-success",
      bgColor: "bg-green-50",
    },
    {
      label: "Créditos Vencidos",
      value: overdueCredits.toString(),
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      ),
      color: "text-konfio-danger",
      bgColor: "bg-red-50",
    },
    {
      label: "Cartera Vigente",
      value: formatCurrency(totalPortfolio),
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "text-konfio-accent",
      bgColor: "bg-amber-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-lg border border-konfio-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <div className={`rounded-lg p-2 ${card.bgColor} ${card.color}`}>
              {card.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-konfio-gray-500">
                {card.label}
              </p>
              <p className={`text-xl font-bold ${card.color}`}>{card.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
