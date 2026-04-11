import type { PokemonDetail } from "@/types/pokemon";
import { TypeBadge } from "./TypeBadge";
import Image from "next/image";

type PokemonDetailProps = {
    pokemon: PokemonDetail;
}

export function PokemonDetail({ pokemon }: PokemonDetailProps) {
    const paddedId = `#${pokemon.id.toString().padStart(3, "0")}`;
    const maxStat = 255;

    return (
        <div className="mx-auto max-w-2xl">
            <div className="flex items-center gap-3">
                <span className="text-lg font-medium text-gray-400">{paddedId}</span>
                <h1 className="text-3xl font-bold">{pokemon.name}</h1>
            </div>
            <Image
                src={pokemon.sprite}
                alt={pokemon.name}
                className="mx-auto h-48 w-48"
                width={192}
                height={192}
                unoptimized={true}
            />
            <div className="mt-4 flex justify-center gap-2">
                {pokemon.types.map((type) => (
                    <TypeBadge key={type} type={type} />
                ))}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-100 p-4 text-center">
                    <p className="text-sm text-gray-500">Height</p>
                    <p className="text-xl font-semibold">{pokemon.height}</p>
                </div>
                <div className="rounded-lg bg-gray-100 p-4 text-center">
                    <p className="text-sm text-gray-500">Weight</p>
                    <p className="text-xl font-semibold">{pokemon.weight}</p>
                </div>
            </div>
            <div className="mt-6">
                <h2 className="text-xl font-semibold">Abilities</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                    {pokemon.abilities.map((ability) => (
                        <span
                            key={ability}
                            className="rounded-full bg-gray-200 px-3 py-1 text-sm"
                        >
                            {ability}
                        </span>
                    ))}
                </div>
            </div>
            <div className="mt-6">
                <h2 className="text-xl font-semibold">Stats</h2>
                <div className="mt-2 space-y-3">
                    {pokemon.stats.map((stat) => (
                        <div key={stat.name} data-testid={`stat-${stat.name}`}>
                            <div className="flex justify-between text-sm">
                                <span>{stat.name}</span>
                                <span>{stat.value}</span>
                            </div>
                            <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                                <div
                                    className="h-2 rounded-full bg-blue-500"
                                    style={{ width: `${(stat.value / maxStat) * 100}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}