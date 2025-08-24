import React from "react";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import { Image } from "@/components/common/Image";
import { Skeleton } from "@/components/ui/skeleton";
import { getPokemonImage } from "@/utils/get-pokemon-image";
import { getPokemonCardColor } from "@/utils/get-pokemon-card-background";
import { useFetchPokemonEvolutionData } from "../hooks/use-fetch-pokemon-evolution-data";
import { Link } from "react-router-dom";

export default function PokemonEvolution() {
  const {
    pokemonData,
    pokemonEvolutionData,
    isLoading: isPokemonEvolutionDataLoading,
  } = useFetchPokemonEvolutionData();
  const pokemonType = pokemonData?.types[0].type.name;
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      {isPokemonEvolutionDataLoading ? (
        <div className="flex items-center justify-center h-20">
          <Skeleton className="w-32 h-full" />
        </div>
      ) : (
        <div
          className={cn("w-full flex flex-col lg:flex-row items-center gap-3", {
            "justify-center lg:gap-24":
              Number(pokemonEvolutionData?.length) <= 2,
            "justify-between": Number(pokemonEvolutionData?.length) > 2,
          })}>
          {pokemonEvolutionData?.map((evolution, index) => (
            <React.Fragment key={index}>
              <Link
                to={`/pokemon/${evolution.name}`}
                className="flex gap-2 justify-between items-center">
                <div className="flex flex-col items-center justify-center">
                  <figure>
                    <Image
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
              </Link>
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
      )}
    </div>
  );
}
