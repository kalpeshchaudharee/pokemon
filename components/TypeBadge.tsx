const typeColors: Record<string, string> = {
    normal: "bg-gray-400 text-white",
    fire: "bg-red-500 text-white",
    water: "bg-blue-500 text-white",
    electric: "bg-yellow-400 text-black",
    grass: "bg-green-500 text-white",
    ice: "bg-cyan-300 text-black",
    fighting: "bg-red-700 text-white",
    poison: "bg-purple-500 text-white",
    ground: "bg-amber-600 text-white",
    flying: "bg-indigo-300 text-white",
    psychic: "bg-pink-500 text-white",
    bug: "bg-lime-500 text-white",
    rock: "bg-yellow-700 text-white",
    ghost: "bg-purple-700 text-white",
    dragon: "bg-indigo-600 text-white",
    dark: "bg-gray-700 text-white",
    steel: "bg-gray-400 text-white",
    fairy: "bg-pink-300 text-black",
};

type TypeBadgeProps = {
    type: string;
}

export function TypeBadge({ type }: TypeBadgeProps) {
    const colorClass = typeColors[type] ?? "bg-gray-300 text-black";

    return (
        <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${colorClass}`}>
            {type}
        </span>
    )
}