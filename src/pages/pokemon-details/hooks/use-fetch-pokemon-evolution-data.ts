import { useFetchPokemonCardDetails } from "@/query/use-fetch-pokemon-card-details";
import { useFetchPokemonEvolution } from "@/query/use-fetch-pokemon-evolution";
import { useFetchPokemonSpecies } from "@/query/use-fetch-pokemon-species";
import { getPokemonIdFromUrl } from "@/utils/get-pokemon-id-from-url";
import { useParams } from "react-router-dom";

export const useFetchPokemonEvolutionData = () => {
  const { pokemonName } = useParams();

  const { data: pokemonData, isLoading: isPokemonDataLoading } =
    useFetchPokemonCardDetails({
      pokemonName: pokemonName as string, // since we are enabling the query if pokemonName is valid or not it is safe here to assert type
    });

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
    isPokemonEvolutionDataLoading ||
    isPokemonSpeciesDataLoading ||
    isPokemonDataLoading;

  return {
    pokemonSpeciesData,
    pokemonEvolutionData,
    pokemonData,
    isLoading,
  };
};
