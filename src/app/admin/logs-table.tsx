import React, { useEffect, useState } from "react";

interface Log {
  id: string;
  timestamp: string;
  action: string;
  details?: string;
  user?: {
    name?: string;
    email?: string;
  };
}

export function LogsTable() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/logs")
      .then((res) => res.json())
      .then((data) => {
        setLogs(data.logs || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Error al cargar logs");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando logs...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-3 py-2 border">Fecha/Hora</th>
            <th className="px-3 py-2 border">Usuario</th>
            <th className="px-3 py-2 border">Email</th>
            <th className="px-3 py-2 border">Acción</th>
            <th className="px-3 py-2 border">Detalles</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td className="px-3 py-2 border">{new Date(log.timestamp).toLocaleString()}</td>
              <td className="px-3 py-2 border">{log.user?.name || "-"}</td>
              <td className="px-3 py-2 border">{log.user?.email || "-"}</td>
              <td className="px-3 py-2 border font-semibold">{log.action}</td>
              <td className="px-3 py-2 border">{log.details || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
