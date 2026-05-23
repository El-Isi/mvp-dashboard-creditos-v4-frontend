import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dashboard de Créditos — Konfío",
  description:
    "Dashboard para que los asesores de Konfío vean el estado de créditos de sus clientes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen">
        <header className="bg-konfio-primary text-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-konfio-secondary font-bold text-konfio-primary">
                K
              </div>
              <span className="text-lg font-semibold tracking-tight">
                Konfío
              </span>
            </div>
            <nav className="flex items-center gap-6 text-sm">
              <span className="font-medium text-konfio-secondary">Créditos</span>
              <span className="text-konfio-gray-300 hover:text-white cursor-pointer transition-colors">Clientes</span>
              <span className="text-konfio-gray-300 hover:text-white cursor-pointer transition-colors">Reportes</span>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
