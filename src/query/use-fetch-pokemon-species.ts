import { fetchPokemonSpecies } from '@/api-client/fetch-pokemon-species';
import { useQuery } from '@tanstack/react-query';

interface UseFetchPokemonSpeciesProps {
  pokemonName: string;
}

export const useFetchPokemonSpecies = ({
  pokemonName,
}: UseFetchPokemonSpeciesProps) => {
  return useQuery({
    queryKey: ['pokemon', 'species', { pokemonName }],
    queryFn: ({ signal }) => fetchPokemonSpecies({ pokemonName, signal }),
    enabled: !!pokemonName,
    select(data) {
      return {
        ...data,
        genera: data.genera.filter((genus) => genus.language.name === 'en'),
        flavor_text_entries: data.flavor_text_entries.filter(
          (flavor) => flavor.language.name === 'en'
        ),
      };
    },
  });
};
