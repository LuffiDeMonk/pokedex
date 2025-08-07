import AnimatedProgressBar from "@/components/common/AnimatedProgressBar";
import { cn } from "@/lib/utils";
import { useFetchPokemonCardDetails } from "@/query/use-fetch-pokemon-card-details";
import { getPokemonCardColor } from "@/utils/get-pokemon-card-background";
import { useParams } from "react-router-dom";
import { formatPokemonStatusTitle } from "../utils/formatPokemonStatusTitle";

export default function PokemonStats() {
  const { pokemonName } = useParams();
  const { data: pokemonAbilityData } = useFetchPokemonCardDetails({
    pokemonName: pokemonName as string,
  });

  return (
    <div className="flex w-full items-center justify-center">
      <div className="xl:basis-1/3 shrink-0 space-y-4">
        {pokemonAbilityData?.stats?.map((stat, index) => (
          <div className="flex gap-10 items-center" key={index}>
            <span className="w-40 font-medium text-gray-700 text-right text-nowrap capitalize">
              {formatPokemonStatusTitle(stat.stat.name)}
            </span>
            <div className="flex flex-wrap gap-2 w-full">
              <AnimatedProgressBar
                value={stat.base_stat > 100 ? 100 : stat.base_stat}
                className={cn(`h-4 w-64`)}
                indicatorClassNames={`${getPokemonCardColor({
                  pokemonType: pokemonAbilityData?.types[0].type.name,
                })}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
