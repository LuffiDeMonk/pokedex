import type { PokeAPI } from "pokeapi-types";

export interface PokemonCardDetails {
  name: string;
  sprites: PokeAPI.PokemonSprites;
  types: PokeAPI.PokemonType
}
