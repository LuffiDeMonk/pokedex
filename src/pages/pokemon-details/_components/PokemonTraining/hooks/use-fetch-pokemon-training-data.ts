import { useFetchPokemonCardDetails } from "@/query/use-fetch-pokemon-card-details";
import {
  useFetchPokemonMoveDetails,
  type UseFetchPokemonMoveDetailsProps,
} from "@/query/use-fetch-pokemon-move-details";
import { useParams } from "react-router-dom";

export const useFetchPokemonTrainingData = () => {
  const { pokemonName } = useParams();

  const { data: pokemonBaseData, isLoading: isPokemonBaseDataLoading } =
    useFetchPokemonCardDetails({
      pokemonName: pokemonName as string,
    });

  const { data: pokemmonMoveDetails, isLoading: isPokemonMoveDetailsLoading } =
    useFetchPokemonMoveDetails({
      pokemonMoves:
        pokemonBaseData?.moves as UseFetchPokemonMoveDetailsProps["pokemonMoves"],
    });

  const isLoading = isPokemonBaseDataLoading || isPokemonMoveDetailsLoading;

  return {
    pokemmonMoveDetails,
    isLoading,
  };
};
