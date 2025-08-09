import type { PokeAPI } from "pokeapi-types";
import { getPokemonIdFromUrl } from "./get-pokemon-id-from-url";
import type { formattedPokemonEvolutionData } from "@/modals";

export const formatPokemonEvolution = (
  data: PokeAPI.EvolutionChain["chain"],
  formattedPokemonEvolutionData: formattedPokemonEvolutionData[]
) => {
  const formattedData: formattedPokemonEvolutionData = {
    id: getPokemonIdFromUrl(data.species.url),
    name: data.species.name,
    min_level: data.evolution_details?.[0]?.min_level ?? null,
  };
  formattedPokemonEvolutionData.push(formattedData);

  data.evolves_to?.forEach((evolution) => {
    formatPokemonEvolution(evolution, formattedPokemonEvolutionData);
  });

  if (formattedPokemonEvolutionData.length > 1) {
    const sortedMinLevels = [...formattedPokemonEvolutionData]
      .map((pokemon) => pokemon.min_level)
      .filter((level) => level !== undefined)
      .sort((a, b) => {
        return a - b;
      });

    formattedPokemonEvolutionData.forEach((pokemon, index) => {
      pokemon.min_level = sortedMinLevels[index] ?? undefined;
    });
  }
};
