import { fetchPokemonTypes } from "@/api-client/fetch-pokemon-types";
import { getQueryStaleTime } from "@/utils/get-query-stale-time";
import { useQueries, type QueryFunctionContext } from "@tanstack/react-query";
import type { PokeAPI } from "pokeapi-types";

interface UseFetchPokemonTypesProps {
  types: string[] | undefined;
}

export const useFetchPokemonTypes = ({ types }: UseFetchPokemonTypesProps) => {
  return useQueries({
    queries: (types ?? []).map((type) => ({
      queryKey: ["pokemon", { type }],
      queryFn: ({ signal }: QueryFunctionContext) =>
        fetchPokemonTypes({
          pokemonType: type,
          signal,
        }),
      enabled: typeof types !== "undefined" && types.length > 0 && !!type,
      staleTime: getQueryStaleTime("Infinity"),
    })),
    combine: (results) => ({
      data: results
        .map((result) => result.data)
        .filter((data): data is PokeAPI.Type => data !== undefined),
      isLoading: results.some((result) => result.isLoading),
    }),
  });
};

useFetchPokemonTypes.getQueryKey = ({ types }: UseFetchPokemonTypesProps) => [
  "pokemon",
  { types },
];
