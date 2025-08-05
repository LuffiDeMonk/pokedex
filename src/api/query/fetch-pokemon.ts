import { http } from "@/api";
import type { PokemonApiListResponse } from "../modals";

export const fetchPokemon = async ({signal}: {signal?:AbortSignal}) => {
  return await http<PokemonApiListResponse>({url: "/pokemon", method: 'GET', signal});
};
