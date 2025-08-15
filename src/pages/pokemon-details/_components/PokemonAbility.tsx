import { useParams } from "react-router-dom";
import { queryClient } from "@/utils/query-client";
import PokemonStatusBadge from "@/components/common/PokemonStatusBadge";
import { getPokemonCardColor } from "@/utils/get-pokemon-card-background";
import { useFetchPokemonDetails } from "../hooks/use-fetch-pokemon-details";
import { fetchPokemonCardDetails } from "@/api-client/fetch-pokemon-card-details";

export default function PokemonAbility() {
  const { pokemonData: pokemonAbilityData, pokemonSpeciesData } =
    useFetchPokemonDetails();
  const { pokemonName: basePokemon } = useParams();
  const handlebadgeClick = async ({ pokemonName }: { pokemonName: string }) => {
    if (pokemonSpeciesData?.varieties.length === 1) return;
    const selectedPokemonForm = await queryClient.fetchQuery({
      queryKey: ["pokemon", "card", "details", { pokemonName }],
      queryFn: () => fetchPokemonCardDetails({ pokemonName }),
    });
    await queryClient.setQueryData(
      ["pokemon", "card", "details", { pokemonName: basePokemon }],
      selectedPokemonForm
    );
  };

  return (
    <div className="flex items-center basis-full xl:basis-1/3 justify-center">
      <div className="space-y-4 w-full">
        <div className="flex gap-10 items-start justify-normal w-full">
          <span className="w-24 font-medium text-gray-700 text-right shrink-0">
            ID
          </span>
          <div className="flex flex-wrap gap-2 w-full">
            {pokemonAbilityData?.id}
          </div>
        </div>
        <div className="flex gap-10 items-start">
          <span className="w-24 font-medium text-gray-700 text-right shrink-0">
            Height
          </span>
          <div className="flex flex-wrap gap-2 w-full">
            {pokemonAbilityData?.height}
          </div>
        </div>
        <div className="flex gap-10 items-start">
          <span className="w-24 font-medium text-gray-700 text-right shrink-0">
            Weight
          </span>
          <div className="flex flex-wrap gap-2 w-full">
            {pokemonAbilityData?.weight}
          </div>
        </div>
        <div className="flex gap-10 items-start">
          <span className="w-24 font-medium text-gray-700 text-right shrink-0">
            Abilities
          </span>
          <div className="flex gap-2 w-full flex-wrap">
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
        <div className="flex gap-10">
          <span className="w-24 font-medium text-gray-700 text-right shrink-0">
            Type
          </span>
          <div className="flex gap-2 w-full flex-wrap">
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
        <div className="flex gap-10">
          <span className="w-24 font-medium text-gray-700 text-right shrink-0">
            Forms
          </span>
          <div className="flex gap-2 flex-wrap w-full">
            {pokemonSpeciesData?.varieties.map((form, index) => (
              <div
                key={index}
                onClick={() =>
                  handlebadgeClick({ pokemonName: form.pokemon.name })
                }>
                <PokemonStatusBadge
                  key={index}
                  type={form.pokemon.name}
                  className={`${getPokemonCardColor({
                    pokemonType: pokemonAbilityData?.types[0].type.name,
                  })} text-white font-normal max-w-full cursor-pointer`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
