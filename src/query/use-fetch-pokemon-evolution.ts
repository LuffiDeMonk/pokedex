import { fetchPokemonEvolution } from '@/api-client/fetch-pokemon-evolution';
import type { formattedPokemonEvolutionData } from '@/modals';
import { formatPokemonEvolution } from '@/utils/format-pokemon-evolution';
import { useQuery } from '@tanstack/react-query';

interface UseFetchPokemonEvolutionProps {
  pokemonId?: string;
}

export const useFetchPokemonEvolution = ({
  pokemonId,
}: UseFetchPokemonEvolutionProps) => {
  return useQuery({
    queryKey: ['pokemon', 'evolution', { pokemonId }],
    queryFn: ({ signal }) =>
      fetchPokemonEvolution({ pokemonId: pokemonId as string, signal }),
    enabled: !!pokemonId,
    select: (data) => {
      const formattedData: formattedPokemonEvolutionData[] = [];
      formatPokemonEvolution(data.chain, formattedData);
      return formattedData;
    },
  });
};
