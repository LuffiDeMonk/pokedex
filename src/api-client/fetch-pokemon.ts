import { http } from '@/api';
import type { PokeAPI } from 'pokeapi-types';

export const fetchPokemon = async ({
  limit = 20,
  signal,
}: {
  limit?: number;
  signal?: AbortSignal;
}) => {
  return await http<PokeAPI.NamedAPIResourceList>({
    url: `/pokemon?limit=${limit}`,
    method: 'GET',
    signal,
  });
};
