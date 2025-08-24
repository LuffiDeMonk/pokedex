import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { getPokemonImage } from "@/utils/get-pokemon-image";
import PokemonStatusBadge from "@/components/common/PokemonStatusBadge";
import { getPokemonCardColor } from "@/utils/get-pokemon-card-background";
import { useFetchPokemonCardDetails } from "@/query/use-fetch-pokemon-card-details";
import { Button } from "@/components/ui/button";
import { formatPokemonStatusTitle } from "@/pages/pokemon-details/utils/formatPokemonStatusTitle";
import { Image } from "@/components/common/Image";
import AppIcon from "@/components/common/AppIcon";

interface PokemonCardProps {
  pokemonName: string;
}

export const PokemonCard = ({ pokemonName }: PokemonCardProps) => {
  const { data: pokemon } = useFetchPokemonCardDetails({ pokemonName });
  const navigate = useNavigate();
  const handleCardClick = () => {
    if (typeof pokemon === "undefined") return;
    navigate(`/pokemon/${pokemon.name}`);
  };
  return (
    <div
      className="bg-card rounded-xl border border-border shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-300 cursor-pointer group hover:scale-102 overflow-hidden"
      onClick={handleCardClick}>
      {/* Pokemon Image */}
      <div className="relative bg-gradient-to-br from-muted/50 to-muted p-4 aspect-square">
        <Image
          src={getPokemonImage({ pokemonId: String(pokemon?.id) })}
          alt={pokemon?.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
        />

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 w-8 h-8 rounded-full ${
            false
              ? "text-red-500 bg-white/90"
              : "text-muted-foreground bg-white/70 hover:bg-white/90"
          } hover:scale-110 transition-all duration-200`}>
          <AppIcon name="heart" />
        </Button>

        {/* Pokemon ID */}
        <div className="absolute top-2 left-2 bg-black/20 text-white text-xs font-medium px-2 py-1 rounded-full">
          #{pokemon?.id?.toString()?.padStart(3, "0")}
        </div>
      </div>
      {/* Pokemon Info */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground text-lg mb-2 capitalize group-hover:text-primary transition-colors duration-200">
          {pokemon?.name}
        </h3>

        {/* Types */}
        <div className="flex flex-wrap gap-1 mb-3">
          {pokemon?.types?.map((type) => (
            <PokemonStatusBadge
              key={type.slot}
              type={type.type.name}
              className={cn(
                "text-white font-normal text-xs",
                getPokemonCardColor({ pokemonType: type.type.name })
              )}
            />
          ))}
        </div>

        {/* Stats Preview */}
        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
          {pokemon?.stats
            .slice()
            .reverse()
            .slice(0, 3)
            .map((stat) => (
              <div className="text-center" key={stat.stat.name}>
                <div className="font-medium text-foreground">
                  {stat.base_stat}
                </div>
                <div className="text-xs capitalize">
                  {formatPokemonStatusTitle(stat.stat.name)}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
