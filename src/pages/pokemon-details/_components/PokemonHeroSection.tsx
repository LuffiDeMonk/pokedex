import { cn } from "@/lib/utils";
import type { PokeAPI } from "pokeapi-types";
import { Button } from "@/components/ui/button";
import AppIcon from "@/components/common/AppIcon";
import { Image } from "@/components/common/Image";
import type { IconName } from "lucide-react/dynamic";
import { getPokemonImage } from "@/utils/get-pokemon-image";
import { formatPokemonHeight } from "../utils/format-pokemon-height";
import PokemonStatusBadge from "@/components/common/PokemonStatusBadge";
import { getPokemonCardColor } from "@/utils/get-pokemon-card-background";
import { formatPokemonWeight } from "../utils/format-pokemon-weight";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PokemonHeroSectionProps {
  pokemonDetails: PokeAPI.Pokemon | undefined;
  pokemonSpeciesData: PokeAPI.PokemonSpecies | undefined;
}

export default function PokemonHeroSection({
  pokemonDetails,
  pokemonSpeciesData,
}: PokemonHeroSectionProps) {
  const POKEMON_STATS: Array<{
    label: string;
    value: string;
    icon: IconName;
  }> = [
    {
      label: "Height",
      value: formatPokemonHeight(pokemonDetails?.height),
      icon: "ruler",
    },
    {
      label: "Weight",
      value: formatPokemonWeight(pokemonDetails?.weight),
      icon: "weight",
    },
    {
      label: "Base Exp",
      value: `${pokemonDetails?.base_experience}`,
      icon: "star",
    },
  ];
  return (
    <div
      className={`bg-gradient-to-br bg-opacity-70 ${getPokemonCardColor({
        pokemonType: pokemonDetails?.types[0].type.name,
      })} border-b border-border/50 relative overflow-hidden`}>
      <div className="container mx-auto px-4 py-12 relative">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
          {/* Pokemon Image Section */}
          <div className="relative flex-shrink-0">
            <div className="relative">
              <div className="size-72 lg:size-96 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden border border-white/20">
                <Image
                  src={getPokemonImage({
                    pokemonId: String(pokemonDetails?.id),
                  })}
                  alt={pokemonDetails?.name}
                  className="w-full h-full object-contain p-8 drop-shadow-2xl"
                />
              </div>

              {/* Floating Pokemon ID */}
              <div className="absolute -top-4 -left-4 bg-white/90 backdrop-blur-sm border border-white/30 rounded-2xl px-4 py-2 shadow-lg">
                <span className="text-sm font-bold text-gray-600">
                  #{pokemonDetails?.id?.toString()?.padStart(3, "0")}
                </span>
              </div>

              {/* Favorite Button */}
              <Button
                variant={false ? "default" : "outline"}
                size="icon"
                // onClick={onToggleFavorite}
                className={`absolute -top-4 -right-4 h-14 w-14 rounded-full shadow-xl backdrop-blur-sm transition-all duration-200 hover:scale-110 ${
                  true
                    ? "bg-red-500 hover:bg-red-600 text-white border-red-300"
                    : "bg-white/90 hover:bg-white text-gray-600 border-white/30"
                }`}>
                <AppIcon
                  name="heart"
                  size={24}
                  className={true ? "fill-current" : ""}
                />
              </Button>
            </div>
          </div>

          {/* Pokemon Info Section */}
          <div className="flex-1 text-center lg:text-left space-y-8">
            {/* Title Section */}
            <div className="space-y-4">
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold text-white capitalize mb-3 tracking-tight">
                  {pokemonDetails?.name}
                </h1>
                <Dialog>
                  <DialogTrigger>
                    {pokemonSpeciesData?.genera?.map((type, index) => (
                      <div key={index} className={`text-xl`}>
                        {type.genus}
                      </div>
                    ))}
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="capitalize text-xl font-normal">
                        {pokemonDetails?.name}
                      </DialogTitle>
                      <PokemonStatusBadge
                        type={"Pokédex Entries"}
                        className={cn(
                          "text-white font-normal max-w-full rounded-sm text-xs",
                          getPokemonCardColor({
                            pokemonType: pokemonDetails?.types[0].type.name,
                          })
                        )}
                      />
                    </DialogHeader>
                    <DialogDescription className="p-0 px-4">
                      <div className="max-h-80 overflow-y-auto overflow-hidden space-y-4 hide-scrollbar">
                        {pokemonSpeciesData?.flavor_text_entries.map((text) => (
                          <div
                            key={text.flavor_text}
                            className="flex flex-col justify-center items-center gap-1">
                            <PokemonStatusBadge
                              type={`Pokédex ${text.version.name}`}
                              className={cn(
                                "max-w-fit text-white text-lg font-medium rounded-sm",
                                getPokemonCardColor({
                                  pokemonType:
                                    pokemonDetails?.types[0].type.name,
                                })
                              )}
                            />
                            <p className="text-sm text-center">
                              {text.flavor_text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </DialogDescription>
                    <DialogFooter>
                      <DialogClose>
                        <Button>Close</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Type Badges */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {pokemonDetails?.types?.map((type) => (
                  <PokemonStatusBadge
                    key={type.type.name}
                    type={type.type.name}
                    className={cn(
                      getPokemonCardColor({
                        pokemonType: type.type.name,
                      }),
                      "text-white font-normal"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {POKEMON_STATS?.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 hover:bg-white/80 transition-all duration-200">
                  <div className="flex items-center justify-center mb-2">
                    <AppIcon
                      name={stat?.icon}
                      size={20}
                      className="text-gray-500"
                    />
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1 text-center">
                    {stat?.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium text-center">
                    {stat?.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <Button
                variant="outline"
                className="bg-white/70 backdrop-blur-sm border-white/30 hover:bg-white/90 hover:scale-105 transition-all duration-200 px-6 py-3 rounded-2xl font-medium shadow-lg">
                <AppIcon name="share-2" className="size-4" />
                Share
              </Button>
              <Button
                variant="default"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-105 transition-all duration-200 px-6 py-3 rounded-2xl font-medium shadow-lg border-0">
                <AppIcon name="git-compare" className="size-4" />
                Compare
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
