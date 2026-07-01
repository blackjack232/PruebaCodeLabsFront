import Link from "next/link";

export default function AdminPage() {
  return (
    <section className="space-y-4 rounded-lg border border-gray-200 bg-white p-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrador</h1>
      <p className="text-gray-700">Gestiona eventos, inscripciones y estadísticas.</p>
      <div className="flex gap-3">
        <Link href="/admin/events" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          Administrar eventos
        </Link>
      </div>
    </section>
  );
}
