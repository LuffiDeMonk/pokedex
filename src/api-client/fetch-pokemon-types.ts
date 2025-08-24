import { http } from "@/api";
import type { PokeAPI } from "pokeapi-types";

interface FetchPokemonTypesProps {
  pokemonType: string;
  signal?: AbortSignal;
}

export const fetchPokemonTypes = ({
  pokemonType,
  signal,
}: FetchPokemonTypesProps) => {
  return http<PokeAPI.Type>({
    method: "GET",
    url: `/type/${pokemonType}`,
    signal,
  });
};
