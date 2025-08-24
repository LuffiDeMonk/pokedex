import { fetchPokemonAbilityDetails } from "@/api-client/fetch-pokemon-ability-details";
import { getQueryStaleTime } from "@/utils/get-query-stale-time";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/utils/query-client";

interface UseFetchPokemonAbilityDetailsProps {
  abilityId: string;
}

export const useFetchPokemonAbilityDetails = ({
  abilityId,
}: UseFetchPokemonAbilityDetailsProps) => {
  return useQuery({
    queryKey: ["pokemon", "ability", { abilityId }],
    queryFn: ({ signal }) => fetchPokemonAbilityDetails({ abilityId, signal }),
    staleTime: getQueryStaleTime("Infinity"),
    enabled: !!abilityId,
    select: (data) => {
        return {
            ...data,
            effect_entries: data.effect_entries.filter(item => item.language.name === 'en'),
            flavor_text_entries: data.flavor_text_entries.filter(item => item.language.name === 'en'),
            names: data.names.filter(item => item.language.name === 'en'),
        }
    }
  });
};

useFetchPokemonAbilityDetails.getQueryKey = ({
  abilityId,
}: UseFetchPokemonAbilityDetailsProps) => ["pokemon", "ability", { abilityId }];

useFetchPokemonAbilityDetails.invalidateQuery = ({
  abilityId,
}: UseFetchPokemonAbilityDetailsProps) => {
  return queryClient.invalidateQueries({
    queryKey: useFetchPokemonAbilityDetails.getQueryKey({ abilityId }),
  });
};
