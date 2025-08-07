import type { PokeAPI } from "pokeapi-types";
import { cn } from "@/lib/utils";
import { getPokemonCardColor } from "@/utils/get-pokemon-card-background";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { formatPokemonEvolution } from "@/utils/format-pokemon-evolution";
import type { formattedPokemonEvolutionData } from "@/modals";
import { getPokemonImage } from "@/utils/get-pokemon-image";
import { ArrowRightIcon } from "lucide-react";

interface PokemonEvolutionProps {
  pokemonEvolution: PokeAPI.EvolutionChain;
  pokemonType?: string;
}

export default function PokemonEvolution({
  pokemonEvolution,
  pokemonType,
}: PokemonEvolutionProps) {
  const formattedPokemonEvolutionData: formattedPokemonEvolutionData[] = [];

  formatPokemonEvolution(pokemonEvolution.chain, formattedPokemonEvolutionData);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={cn(
          "text-white px-4 py-2 rounded-sm text-xl",
          getPokemonCardColor({ pokemonType })
        )}>
        Pokemon Evolution
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-3 w-full">
        {formattedPokemonEvolutionData.map((evolution, index) => (
          <>
            <div
              className="flex gap-2 justify-between items-center"
              key={index}>
              <div className="flex flex-col items-center justify-center">
                <figure>
                  <LazyLoadImage
                    src={getPokemonImage({ pokemonId: String(evolution.id) })}
                    alt={evolution.name}
                    className="size-40 shrink-0"
                  />
                </figure>
                <p
                  className={cn(
                    "text-sm capitalize rounded-sm px-2 py-1 text-white",
                    getPokemonCardColor({ pokemonType })
                  )}>
                  {evolution.name}
                </p>
              </div>
            </div>
            {evolution.min_level !== undefined && (
              <div className="flex flex-col lg:flex-col items-center gap-2">
                <p>Level {evolution.min_level}+</p>
                <ArrowRightIcon
                  className={cn("size-16 rotate-90 lg:rotate-0")}
                />
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
}
