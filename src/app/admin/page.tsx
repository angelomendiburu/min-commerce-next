"use client";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

const LogsTable = dynamic(
  () => import("./logs-table").then((m) => m.LogsTable),
  { ssr: false }
);

export default function AdminPage() {
  const { data: session } = useSession();

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Panel Administrativo</h1>
      <p className="mb-6">
        Registro de login, logout y acciones de todos los usuarios:
      </p>
      <LogsTable />
    </div>
  );
}
