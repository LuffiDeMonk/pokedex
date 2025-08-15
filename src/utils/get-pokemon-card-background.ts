import { POKEMON_TYPES_COLORS } from '@/constants';

interface GetPokemonCardColorProps {
  pokemonType: string | undefined;
}

export const getPokemonCardColor = ({
  pokemonType,
}: GetPokemonCardColorProps) => {
  return POKEMON_TYPES_COLORS[pokemonType as keyof typeof POKEMON_TYPES_COLORS];
};
