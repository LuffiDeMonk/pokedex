import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { getPokemonImage } from "@/utils/get-pokemon-image";
import { Card, CardDescription } from "@/components/ui/card";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PokemonStatusBadge from "@/components/common/PokemonStatusBadge";
import { getPokemonCardColor } from "@/utils/get-pokemon-card-background";
import { useFetchPokemonCardDetails } from "@/query/use-fetch-pokemon-card-details";

interface PokemonCardProps {
  pokemonName: string;
}

export const PokemonCard = ({ pokemonName }: PokemonCardProps) => {
  const { data: pokemonCardData } = useFetchPokemonCardDetails({ pokemonName });
  const navigate = useNavigate();
  const handleCardClick = () => {
    if (typeof pokemonCardData === "undefined") return;
    navigate(`/pokemon/${pokemonCardData.name}`);
  };
  return (
    <Card
      className={cn(
        "h-40 p-0 cursor-pointer",
        getPokemonCardColor({
          pokemonType: pokemonCardData?.types[0].type.name,
        })
      )}
      onClick={handleCardClick}>
      <CardDescription className="relative overflow-hidden h-full px-4 py-2">
        <div className="space-y-6">
          <p className="text-lg font-semibold text-white capitalize">
            {pokemonCardData?.name}
          </p>
          <div className="flex flex-col gap-1">
            {pokemonCardData?.types.map((type, index) => (
              <PokemonStatusBadge type={type.type.name} key={index} />
            ))}
          </div>
        </div>
        {pokemonCardData && (
          <figure className="size-24 absolute -bottom-1 right-0">
            <LazyLoadImage
              src={getPokemonImage({ pokemonId: String(pokemonCardData.id) })}
              alt={pokemonCardData.name}
              effect="blur"
              className="w-full object-cover"
            />
          </figure>
        )}
      </CardDescription>
    </Card>
  );
};
