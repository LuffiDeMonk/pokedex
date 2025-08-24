import { useParams } from "react-router-dom";
import { useFetchPokemonSpecies } from "@/query/use-fetch-pokemon-species";
import { useFetchPokemonCardDetails } from "@/query/use-fetch-pokemon-card-details";

import { useFetchPokemonTypes } from "@/query/use-fetch-pokemon-types";

export const useFetchPokemonDetails = () => {
  const { pokemonName } = useParams();

  const { data: pokemonData, isLoading: isPokemonDataLoading } =
    useFetchPokemonCardDetails({
      pokemonName: pokemonName as string, // since we are enabling the query if pokemonName is valid or not it is safe here to assert type
    });

  const { data: pokemonSpeciesData, isLoading: isPokemonSpeciesDataLoading } =
    useFetchPokemonSpecies({
      pokemonName: pokemonName as string,
    });

  const { data: pokemonTypeData, isLoading: isPokemonTypeDataLoading } =
    useFetchPokemonTypes({
      types: pokemonData?.types.map((type) => type.type.name),
    });

  const isLoading =
    isPokemonDataLoading ||
    isPokemonSpeciesDataLoading ||
    isPokemonTypeDataLoading;

  return {
    isLoading,
    pokemonData,
    pokemonSpeciesData,
    pokemonTypeData,
  };
};
