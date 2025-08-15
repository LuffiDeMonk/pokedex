import type { PokeAPI } from 'pokeapi-types';
import { useQueries, type QueryFunctionContext } from '@tanstack/react-query';
import { getQueryStaleTime } from '@/utils/get-query-stale-time';
import { fetchPokemonMoveDetails } from '@/api-client/fetch-pokemon-move-details';
import { getPokemonIdFromUrl } from '@/utils/get-pokemon-id-from-url';

export interface UseFetchPokemonMoveDetailsProps {
  pokemonMoves: PokeAPI.Pokemon['moves'];
}

export const useFetchPokemonMoveDetails = ({
  pokemonMoves,
}: UseFetchPokemonMoveDetailsProps) => {
  return useQueries({
    queries: (pokemonMoves ?? []).map((move) => ({
      queryKey: [
        'pokemon',
        'move',
        'details',
        { moveId: getPokemonIdFromUrl(move.move.url) },
      ],
      queryFn: ({ signal }: QueryFunctionContext) =>
        fetchPokemonMoveDetails({
          moveId: getPokemonIdFromUrl(move.move.url),
          signal,
        }),
      enabled:
        !!pokemonMoves &&
        typeof getPokemonIdFromUrl(move.move.url) === 'string',
      staleTime: getQueryStaleTime('Infinity'),
    })),
    combine: (results) => ({
      data: results.map((result) => result.data).filter(Boolean),
      isLoading: results.some((result) => result.isLoading),
    }),
  });
};
