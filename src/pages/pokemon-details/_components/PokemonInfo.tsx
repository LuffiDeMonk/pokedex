import { useParams } from "react-router-dom";
import { getPokemonImage } from "@/utils/get-pokemon-image";
import { useFetchPokemonCardDetails } from "@/query/use-fetch-pokemon-card-details";

import PokemonAbility from "./PokemonAbility";
import { Image } from "@/components/common/Image";

export default function PokemonInfo() {
  const { pokemonName } = useParams();
  const { data: pokemonAbilityData } = useFetchPokemonCardDetails({
    pokemonName: pokemonName as string,
  });
  if (!pokemonAbilityData) return null;
  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-3 gap-4 place-items-center xl:place-items-stretch">
      <PokemonAbility />
      <Image
        src={getPokemonImage({ pokemonId: String(pokemonAbilityData.id) })}
        width={453}
        height={453}
        alt="test"
        className="basis-full xl:basis-1/3 shrink-0"
      />
    </div>
  );
}
