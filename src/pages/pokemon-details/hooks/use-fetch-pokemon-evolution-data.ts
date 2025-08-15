import { useFetchPokemonEvolution } from '@/query/use-fetch-pokemon-evolution';
import { useFetchPokemonSpecies } from '@/query/use-fetch-pokemon-species';
import { getPokemonIdFromUrl } from '@/utils/get-pokemon-id-from-url';
import { useParams } from 'react-router-dom';

export const useFetchPokemonEvolutionData = () => {
  const { pokemonName } = useParams();

  const { data: pokemonSpeciesData, isLoading: isPokemonSpeciesDataLoading } =
    useFetchPokemonSpecies({
      pokemonName: pokemonName as string,
    });

  const {
    data: pokemonEvolutionData,
    isLoading: isPokemonEvolutionDataLoading,
  } = useFetchPokemonEvolution({
    pokemonId: getPokemonIdFromUrl(pokemonSpeciesData?.evolution_chain.url),
  });

  const isLoading =
    isPokemonEvolutionDataLoading || isPokemonSpeciesDataLoading;

  return {
    pokemonSpeciesData,
    pokemonEvolutionData,
    isLoading,
  };
};
