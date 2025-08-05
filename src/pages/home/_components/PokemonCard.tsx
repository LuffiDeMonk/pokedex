import { useFetchPokemonCardDetails } from "@/api/query/use-fetch-pokemon-card-details";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getPokemonCardColor } from "@/utils/get-pokemon-card-background";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface PokemonCardProps {
  pokemonName: string;
}

export const PokemonCard = ({ pokemonName }: PokemonCardProps) => {
  const { data } = useFetchPokemonCardDetails({ pokemonName });
  const cardBackground = getPokemonCardColor({
    pokemonType: data?.types[0].type.name,
  });
  return (
    <Card
      className={cn("h-40 p-0")}
      style={{
        background: cardBackground,
      }}>
      <CardDescription className="relative overflow-hidden h-full px-4 py-2">
        <div className="space-y-6">
          <p className="text-lg font-semibold text-white capitalize">
            {data?.name}
          </p>
          <div className='flex flex-col gap-1'>
            {data?.types.map((type, index) => (
            <Badge key={index} className="rounded-full max-w-20 bg-gradient-to-tr from-white/60 to-white/30 text-black text-sm flex justify-center capitalize text-center px-2 py-1 border-0" variant='outline'>
              {type.type.name}
            </Badge>
            ))}
          </div>
        </div>
        {data?.sprites.other?.["official-artwork"]?.front_shiny && (
          <figure className="size-24 absolute -bottom-1 right-0">
            <LazyLoadImage
              src={data.sprites.other["official-artwork"].front_shiny}
              alt={data.name}
              effect="blur"
              className="w-full object-cover"
            />
          </figure>
        )}
      </CardDescription>
    </Card>
  );
};
