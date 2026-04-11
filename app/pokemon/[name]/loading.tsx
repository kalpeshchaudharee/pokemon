export default function Loading() {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6 h-5 w-16 animate-pulse rounded bg-gray-200" />
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center gap-3">
            <div className="h-7 w-12 animate-pulse rounded bg-gray-200" />
            <div className="h-9 w-48 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="mx-auto mt-4 h-48 w-48 animate-pulse rounded-full bg-gray-200" />
          <div className="mt-4 flex justify-center gap-2">
            <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200" />
            <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200" />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="h-20 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-20 animate-pulse rounded-lg bg-gray-200" />
          </div>
          <div className="mt-6 space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-8 animate-pulse rounded bg-gray-200" />
            ))}
          </div>
        </div>
      </main>
    );
  }