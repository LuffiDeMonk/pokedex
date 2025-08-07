import PokemonStatusBadge from "@/components/common/PokemonStatusBadge";
import { useFetchPokemonCardDetails } from "@/query/use-fetch-pokemon-card-details";
import { getPokemonCardColor } from "@/utils/get-pokemon-card-background";
import { useParams } from "react-router-dom";

export default function PokemonAbility() {
  const { pokemonName } = useParams();
  const { data: pokemonAbilityData } = useFetchPokemonCardDetails({
    pokemonName: pokemonName as string,
  });
  return (
    <div className="flex items-center justify-center basis-full xl:basis-1/3 shrink-0">
      <div className="space-y-4">
        <div className="flex gap-10 items-start justify-normal">
          <span className="w-24 font-medium text-gray-700 text-right">ID</span>
          <div className="flex flex-wrap gap-2">{pokemonAbilityData?.id}</div>
        </div>
        <div className="flex gap-10 items-start">
          <span className="w-24 font-medium text-gray-700 text-right">
            Height
          </span>
          <div className="flex flex-wrap gap-2">
            {pokemonAbilityData?.height}
          </div>
        </div>
        <div className="flex gap-10 items-start">
          <span className="w-24 font-medium text-gray-700 text-right">
            Weight
          </span>
          <div className="flex flex-wrap gap-2">
            {pokemonAbilityData?.weight}
          </div>
        </div>
        <div className="flex gap-10 items-start">
          <span className="w-24 font-medium text-gray-700 text-right">
            Abilities
          </span>
          <div className="flex flex-wrap gap-2">
            {pokemonAbilityData?.abilities.map((ability, index) => (
              <PokemonStatusBadge
                key={index}
                type={ability.ability.name}
                className={`${getPokemonCardColor({
                  pokemonType: pokemonAbilityData?.types[0].type.name,
                })} text-white font-normal max-w-full`}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-10 items-end">
          <span className="w-24 font-medium text-gray-700 text-right">
            Type
          </span>
          <div className="flex flex-wrap gap-2">
            {pokemonAbilityData?.types.map((type, index) => (
              <PokemonStatusBadge
                key={index}
                type={type.type.name}
                className={`${getPokemonCardColor({
                  pokemonType: type.type.name,
                })} text-white font-normal max-w-full`}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-10 items-end">
          <span className="w-24 font-medium text-gray-700 text-right">
            Forms
          </span>
          <div className="flex flex-wrap gap-2">
            {pokemonAbilityData?.forms.map((form, index) => (
              <PokemonStatusBadge
                key={index}
                type={form.name}
                className={`${getPokemonCardColor({
                  pokemonType: pokemonAbilityData?.types[0].type.name,
                })} text-white font-normal max-w-full`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
