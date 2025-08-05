import { useQuery } from "@tanstack/react-query";
import { fetchPokemonCardDetails } from "./fetch-pokemon-card-details";
import { getQueryStaleTime } from "@/utils/get-query-stale-time";

interface UseFetchPokemonCardDetailsProps {
  pokemonName: string;
}

export const useFetchPokemonCardDetails = ({
  pokemonName,
}: UseFetchPokemonCardDetailsProps) => {
  return useQuery({
    queryKey: ["pokemon", "card", "details", { pokemonName }],
    queryFn: ({ signal }) => fetchPokemonCardDetails({ pokemonName, signal }),
    enabled: !!pokemonName,
    staleTime: getQueryStaleTime('Infinity')
  });
};
