import { useQuery } from "@tanstack/react-query";
import { fetchPokemon } from "./fetch-pokemon";

export const useFetchPokemons = () => {
  return useQuery({
    queryKey: ["pokemon", "list"],
    queryFn: ({ signal }) => fetchPokemon({ signal }),
    staleTime: 10_000,
    retry(_failureCount, error) {
        console.log(error, 'testing error')
        return false
    },
  });
};
