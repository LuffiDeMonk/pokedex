import { PokemonType, type PokemonVariant } from "@/modals";

const allowedVariants = new Set<PokemonVariant>(Object.values(PokemonType));

export const getPokemonVariant = (
  variant: string | undefined
): PokemonVariant => {
  return allowedVariants.has(variant as PokemonVariant)
    ? (variant as PokemonVariant)
    : "default";
};
