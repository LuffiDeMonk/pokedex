import type { PokeAPI } from "pokeapi-types";
import { getPokemonIdFromUrl } from "./get-pokemon-id-from-url";
import type { formattedPokemonEvolutionData } from "@/modals";

export const formatPokemonEvolution = (
  data: PokeAPI.EvolutionChain["chain"],
  formattedPokemonEvolutionData: formattedPokemonEvolutionData[]
) => {
  data.evolves_to?.forEach((evolution) => {
    formatPokemonEvolution(evolution, formattedPokemonEvolutionData);
  });
  const formattedData: formattedPokemonEvolutionData = {
    id: getPokemonIdFromUrl(data.species.url),
    name: data.species.name,
    min_level: data.evolution_details?.[0]?.min_level,
  };
  formattedPokemonEvolutionData.push(formattedData);
};
