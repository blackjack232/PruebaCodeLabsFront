export function LoaderState() {
  return <div className="rounded-md border border-blue-200 bg-blue-50 p-4 text-blue-700">Cargando información...</div>;
}

export function EmptyState({ message }: { message: string }) {
  return <div className="rounded-md border border-gray-200 bg-gray-50 p-4 text-gray-600">{message}</div>;
}

export function ErrorState({ message }: { message: string }) {
  return <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700">{message}</div>;
}
