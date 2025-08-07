import React from "react";
import { cn } from "@/lib/utils";
import { getPokemonCardColor } from "@/utils/get-pokemon-card-background";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getPokemonImage } from "@/utils/get-pokemon-image";
import { ArrowRightIcon } from "lucide-react";
import { useFetchPokemonEvolutionData } from "../hooks/use-fetch-pokemon-evolution-data";

interface PokemonEvolutionProps {
  pokemonType?: string;
}

export default function PokemonEvolution({
  pokemonType,
}: PokemonEvolutionProps) {
  const { pokemonEvolutionData } = useFetchPokemonEvolutionData();

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
        {pokemonEvolutionData?.map((evolution, index) => (
          <React.Fragment key={index}>
            <div className="flex gap-2 justify-between items-center">
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
                <p className="text-sm">Level {evolution.min_level}+</p>
                <ArrowRightIcon
                  className={cn("size-16 rotate-90 lg:rotate-0")}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
