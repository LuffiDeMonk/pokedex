import AppIcon from "@/components/common/AppIcon";
import { Image } from "@/components/common/Image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPokemonStatusTitle } from "@/pages/pokemon-details/utils/formatPokemonStatusTitle";
import { useStore } from "@/store";
import { getPokemonImage } from "@/utils/get-pokemon-image";
import { getPokemonVariant } from "@/utils/get-pokemon-variant";
import type { PokeAPI } from "pokeapi-types";
import { useNavigate } from "react-router-dom";

interface PokemonComparisionCardProps {
  pokemon: PokeAPI.Pokemon;
}
export default function PokemonComparisionCard({
  pokemon,
}: PokemonComparisionCardProps) {
  const { removePokemon } = useStore();
  const navigate = useNavigate();
  const TOTAL_STATS = pokemon.stats.reduce((acc, currentPokemonStat) => {
    return (acc += currentPokemonStat.base_stat);
  }, 0);
  const removePokemonFromList = () => {
    removePokemon(pokemon.id);
  };
  return (
    <Card>
      <CardHeader className="px-4 pt-4 pb-2 justify-center items-center relative">
        <CardTitle className="text-center text-lg font-medium capitalize">
          {pokemon.name}
        </CardTitle>
        <p className="text-xs font-bold">
          #{pokemon?.id?.toString()?.padStart(3, "0")}
        </p>
        <div className="flex gap-2 items-center justify-center">
          {pokemon.types.map((type) => (
            <Badge
              className="capitalize font-normal w-fit text-xs"
              variant={getPokemonVariant(type.type.name)}>
              {type.type.name}
            </Badge>
          ))}
        </div>
        <Button
          size={"icon"}
          variant={"link"}
          onClick={removePokemonFromList}
          className="absolute top-0 right-0">
          <AppIcon name="plus" className="rotate-45 size-6" />
        </Button>
      </CardHeader>
      <CardContent>
        <CardDescription className="w-full flex flex-col gap-4 items-center justify-center text-black">
          <Image
            src={getPokemonImage({ pokemonId: String(pokemon?.id) })}
            alt={pokemon.name}
            className="size-32 shrink-0"
          />
          <div className="space-y-4 w-full">
            {pokemon.stats.map((stat) => (
              <div
                key={stat.stat.name}
                className="flex items-center justify-between text-black">
                <p className="font-medium capitalize">
                  {formatPokemonStatusTitle(stat.stat.name)}
                </p>
                <p>{stat.base_stat}</p>
              </div>
            ))}
          </div>
          <div className="w-full border-t border-gray-300 py-4 flex items-center justify-between">
            <p className="text-lg font-bold">Total</p>
            <p className="text-lg font-bold">{TOTAL_STATS}</p>
          </div>
          <div className="w-full flex flex-col gap-2">
            <Button
              variant="link"
              onClick={() => navigate(`/pokemon/${pokemon.name}`)}>
              View Details
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-500">
              Add to Favorite
            </Button>
          </div>
        </CardDescription>
      </CardContent>
    </Card>
  );
}
