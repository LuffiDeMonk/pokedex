import { useQuery } from "@tanstack/react-query";
import { fetchPokemon } from "./fetch-pokemon";
import { getQueryStaleTime } from "@/utils/get-query-stale-time";

export const useFetchPokemons = () => {
  return useQuery({
    queryKey: ["pokemon", "list"],
    queryFn: ({ signal }) => fetchPokemon({ signal }),
    staleTime: getQueryStaleTime('5m')
});
};
