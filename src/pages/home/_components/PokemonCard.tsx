import { Badge } from "@/components/ui/badge";
import { getPokemonImage } from "@/utils/get-pokemon-image";
import { Card, CardDescription } from "@/components/ui/card";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getPokemonCardColor } from "@/utils/get-pokemon-card-background";
import { useFetchPokemonCardDetails } from "@/api/query/use-fetch-pokemon-card-details";
import { useNavigate } from "react-router-dom";

interface PokemonCardProps {
  pokemonName: string;
}

export const PokemonCard = ({ pokemonName }: PokemonCardProps) => {
  const { data: pokemonCardData } = useFetchPokemonCardDetails({ pokemonName });
  const navigate = useNavigate();
  const cardBackground = getPokemonCardColor({
    pokemonType: pokemonCardData?.types[0].type.name,
  });
  const handleCardClick = () => {
    if (typeof pokemonCardData === "undefined") return;
    navigate(`/pokemon/${pokemonCardData.name}`);
  };
  return (
    <Card
      className={"h-40 p-0 cursor-pointer"}
      style={{
        background: cardBackground,
      }}
      onClick={handleCardClick}>
      <CardDescription className="relative overflow-hidden h-full px-4 py-2">
        <div className="space-y-6">
          <p className="text-lg font-semibold text-white capitalize">
            {pokemonCardData?.name}
          </p>
          <div className="flex flex-col gap-1">
            {pokemonCardData?.types.map((type, index) => (
              <Badge
                key={index}
                className="rounded-full max-w-20 bg-gradient-to-b from-white/60 to-white/30 text-black text-sm flex justify-center capitalize text-center px-2 py-1 border-0"
                variant="outline">
                {type.type.name}
              </Badge>
            ))}
          </div>
        </div>
        {pokemonCardData && (
          <figure className="size-24 absolute -bottom-1 right-0">
            <LazyLoadImage
              src={getPokemonImage({ pokemonId: pokemonCardData.id })}
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
