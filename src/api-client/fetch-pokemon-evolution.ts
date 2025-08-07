import { http } from "@/api";
import type { PokeAPI } from "pokeapi-types";

interface FetchPokemonEvolutionProps {
  pokemonId: string;
  signal?: AbortSignal;
}

export const fetchPokemonEvolution = ({
  pokemonId,
  signal,
}: FetchPokemonEvolutionProps) => {
  return http<PokeAPI.EvolutionChain>({
    method: "GET",
    url: `/evolution-chain/${pokemonId}`,
    signal,
  });
};
