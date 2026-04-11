import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold">Pokemon Not Found</h1>
      <p className="mt-4 text-gray-500">The Pokemon you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="mt-6 text-blue-500 hover:underline">
        &larr; Back to Pokedex
      </Link>
    </main>
  );
}