import { useQuery } from "@tanstack/react-query";
import { fetchPokemon } from "../api-client/fetch-pokemon";
import { getQueryStaleTime } from "@/utils/get-query-stale-time";

export const useFetchPokemons = ({ limit = 20 }: { limit?: number }) => {
  return useQuery({
    queryKey: ["pokemon", "list", { limit }],
    queryFn: ({ signal }) => fetchPokemon({ limit, signal }),
    staleTime: getQueryStaleTime("5m"),
  });
};
