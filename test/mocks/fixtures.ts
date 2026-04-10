import type { Pokemon, PokemonDetail } from "@/types/pokemon";

export const mockPokemonList: Pokemon[] = [
  {
    id: 1,
    name: "bulbasaur",
    types: ["grass", "poison"],
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  },
  {
    id: 4,
    name: "charmander",
    types: ["fire"],
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
  },
  {
    id: 7,
    name: "squirtle",
    types: ["water"],
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
  },
];

export const mockBulbasaurDetail: PokemonDetail = {
  id: 1,
  name: "bulbasaur",
  types: ["grass", "poison"],
  sprite:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  height: 7,
  weight: 69,
  abilities: ["overgrow", "chlorophyll"],
  stats: [
    { name: "hp", value: 45 },
    { name: "attack", value: 49 },
    { name: "defense", value: 49 },
    { name: "special-attack", value: 65 },
    { name: "special-defense", value: 65 },
    { name: "speed", value: 45 },
  ],
};