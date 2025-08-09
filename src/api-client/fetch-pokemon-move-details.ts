import { http } from "@/api";
import type { PokeAPI } from "pokeapi-types";

interface FetchPokemonMovesProps {
  moveId: string;
  signal?: AbortSignal;
}

export const fetchPokemonMoveDetails = ({
  moveId,
  signal,
}: FetchPokemonMovesProps) => {
  return http<PokeAPI.Move>({
    method: "GET",
    url: `/move/${moveId}`,
    signal,
  });
};
