import { http } from "@/api";
import type { PokeAPI } from "pokeapi-types";

interface FetchPokemonAbilityDetailsProps {
  abilityId: string;
  signal?: AbortSignal;
}

export const fetchPokemonAbilityDetails = ({
  abilityId,
  signal,
}: FetchPokemonAbilityDetailsProps) => {
  return http<PokeAPI.Ability>({
    method: "GET",
    url: `/ability/${abilityId}`,
    signal,
  });
};
