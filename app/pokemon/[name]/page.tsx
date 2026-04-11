import { PokemonDetail } from "@/components/PokemonDetail";
import { fetchPokemonDetail, fetchPokemonList } from "@/lib/pokeapi";
import Link from "next/link";

export const revalidate = 3600;

export async function generateStaticParams() {
    const pokemonList = await fetchPokemonList();

    return pokemonList.map((pokemon) => ({
        name: pokemon.name,
    }));
}

type PokemonPageProps = {
    params: Promise<{ name: string }>;
}

export default async function PokemonPage({ params }: PokemonPageProps) {
    const { name } = await params;
    const pokemon = await fetchPokemonDetail(name);

    return (
        <main className="mx-auto max-w-4xl px-4 py-8">
          <Link href="/" className="mb-6 inline-block text-blue-500 hover:underline">
            &larr; Back
          </Link>
          <PokemonDetail pokemon={pokemon} />
        </main>
      );
}