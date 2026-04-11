import { PokemonGrid } from "@/components/PokemonGrid";
import { fetchPokemonList } from "@/lib/pokeapi";

export const revalidate = 3600;

export default async function Home() {
  const pokemonList = await fetchPokemonList();

  return (
    <main className="mx-auto w-2/3 px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold">Pokedex</h1>
      <PokemonGrid pokemonList={pokemonList} />
    </main>
  )
}