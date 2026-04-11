"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold">Something went wrong</h1>
      <p className="mt-4 text-gray-500">An unexpected error occurred.</p>
      <button
        onClick={reset}
        className="mt-6 rounded-lg bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
      >
        Try again
      </button>
    </main>
  );
}