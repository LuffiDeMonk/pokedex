import { http } from "@/api";
import type { PokeAPI } from "pokeapi-types";

interface FetchPokemonSpeciesProps {
  pokemonName: string;
  signal?: AbortSignal;
}
export const fetchPokemonSpecies = async ({
  pokemonName,
  signal,
}: FetchPokemonSpeciesProps) => {
  return await http<PokeAPI.PokemonSpecies>({
    method: "GET",
    url: `/pokemon-species/${pokemonName}`,
    signal,
  });
};
