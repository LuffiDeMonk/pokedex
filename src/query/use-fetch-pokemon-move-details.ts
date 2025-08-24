import { fetchPokemonMoveDetails } from "@/api-client/fetch-pokemon-move-details";
import { getPokemonIdFromUrl } from "@/utils/get-pokemon-id-from-url";
import { getQueryStaleTime } from "@/utils/get-query-stale-time";
import {
  useSuspenseQueries,
  type QueryFunctionContext,
} from "@tanstack/react-query";
import type { PokeAPI } from "pokeapi-types";

interface UseFetchPokemonMoveDetailsProps {
  moves: PokeAPI.Pokemon["moves"];
}

export const useFetchPokemonMoveDetails = ({
  moves,
}: UseFetchPokemonMoveDetailsProps) => {
  return useSuspenseQueries({
    queries: moves.map((move) => ({
      queryKey: ["pokemon", "move", "details", { moveId: move.move.name }],
      queryFn: ({ signal }: QueryFunctionContext) =>
        fetchPokemonMoveDetails({
          moveId: getPokemonIdFromUrl(move.move.url),
          signal,
        }),
      staleTime: getQueryStaleTime("Infinity"),
      enabled: !!moves && !!move.move.url,
    })),
    combine: (results) => {
      const combinedData = results.map((result, i) => ({
        ...result.data,
        version_group_details: moves[i].version_group_details,
      }));

      const isLoading = results.some((result) => result.isLoading);
      return {
        data: combinedData,
        isLoading,
      };
    },
  });
};
