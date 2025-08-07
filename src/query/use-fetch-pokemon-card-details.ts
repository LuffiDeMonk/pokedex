import { useQuery, type UseQueryOptions, type QueryFunctionContext } from "@tanstack/react-query";
import { fetchPokemonCardDetails } from "../api-client/fetch-pokemon-card-details";
import { getQueryStaleTime } from "@/utils/get-query-stale-time";

interface UseFetchPokemonCardDetailsProps {
  pokemonName: string;
}
type PokemonCardDetails = Awaited<ReturnType<typeof fetchPokemonCardDetails>>;

export const useFetchPokemonCardDetailsQueryProps = ({
  pokemonName,
}: UseFetchPokemonCardDetailsProps): UseQueryOptions<
  PokemonCardDetails,
  Error,
  PokemonCardDetails,
  [string, string, string, { pokemonName: string }]
> => {
  return {
    queryKey: ["pokemon", "card", "details", { pokemonName }],
    queryFn: ({ signal }: QueryFunctionContext) =>
      fetchPokemonCardDetails({ pokemonName, signal }),
    enabled: !!pokemonName,
    staleTime: getQueryStaleTime("Infinity"),
  };
};

export const useFetchPokemonCardDetails = ({
  pokemonName,
}: UseFetchPokemonCardDetailsProps) => {
  return useQuery(useFetchPokemonCardDetailsQueryProps({ pokemonName }));
};
