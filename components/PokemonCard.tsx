import { Pokemon } from "@/types/pokemon";
import { TypeBadge } from "./TypeBadge";
import Image from "next/image";

type PokemonCardProps = {
    pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
    const paddedId =`#${pokemon.id.toString().padStart(3, "0")}`;

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-400">{paddedId}</span>
          </div>
          <Image
            src={pokemon.sprite}
            alt={pokemon.name}
            className="mx-auto h-32 w-32"
            width={128}
            height={128}
            unoptimized={true}
          />
          <h3 className="mt-2 text-center text-lg font-semibold">{pokemon.name}</h3>
          <div className="mt-2 flex justify-center gap-2">
            {pokemon.types.map((type) => (
              <TypeBadge key={type} type={type} />
            ))}
          </div>
        </div>
      );
}