export default function Loading() {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-8 text-center text-4xl font-bold">Pokedex</h1>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="h-10 w-full animate-pulse rounded-lg bg-gray-200 sm:flex-1" />
          <div className="h-10 w-full animate-pulse rounded-lg bg-gray-200 sm:w-48" />
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-64 w-48 animate-pulse rounded-2xl bg-gray-200" />
          ))}
        </div>
      </main>
    );
  }