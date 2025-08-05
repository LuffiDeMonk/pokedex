import { http } from "@/api";
import type { PokeAPI } from "pokeapi-types";

export const fetchPokemon = async ({ signal }: { signal?: AbortSignal }) => {
  return await http<PokeAPI.NamedAPIResourceList>({
    url: "/pokemon",
    method: "GET",
    signal,
  });
};
