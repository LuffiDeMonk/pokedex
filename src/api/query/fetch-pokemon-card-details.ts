import { http } from "..";
import type { PokeAPI } from "pokeapi-types";

export const fetchPokemonCardDetails = ({
  pokemonName,
  signal,
}: {
  pokemonName: string;
  signal?: AbortSignal;
}) => {
  return http<PokeAPI.Pokemon>({
    method: "GET",
    url: `/pokemon/${pokemonName}`,
    signal,
  });
};
