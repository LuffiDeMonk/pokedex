import { Mars, Venus } from "lucide-react";
import type { PokeAPI } from "pokeapi-types";
import { getPokemonGenderStat } from "../../utils/get-pokemon-gender-stat";
import { calculateEggCycles } from "../../utils/calculate-egg-cycles";

interface PokemonBreedingInformationProps {
  pokemonSpeciesData: PokeAPI.PokemonSpecies | undefined;
}

export default function PokemonBreedingInformation({
  pokemonSpeciesData,
}: PokemonBreedingInformationProps) {
  const genderDetails = getPokemonGenderStat(pokemonSpeciesData?.gender_rate);

  return (
    <div className="flex flex-col gap-2 xl:basis-1/3 xl:shrink-0">
      <div className="flex flex-col gap-4 w-full">
        <p className="text-center text-2xl font-semibold uppercase">Breeding</p>
        <div className="space-y-2">
          <div className="w-full flex flex-col justify-end gap-2">
            <div className="flex gap-10 items-start justify-end w-full">
              <span className="w-40 font-medium text-gray-700 text-right shrink-0">
                Egg Group
              </span>
              <div className="flex flex-wrap gap-2 w-full">
                {pokemonSpeciesData?.egg_groups.map((group) => (
                  <span className="capitalize" key={group.url}>
                    {group.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col justify-end gap-2">
            <div className="flex gap-10 items-start justify-end w-full">
              <span className="w-40 font-medium text-gray-700 text-right shrink-0">
                Gender Distribution
              </span>
              <div className="flex flex-wrap gap-2 w-full">
                {genderDetails && Number(genderDetails.maleRate) > 0 && (
                  <div className="flex items-baseline gap-1">
                    <span>{genderDetails.maleRate}%</span>
                    <Mars className="stroke-blue-600 size-4" />
                  </div>
                )}
                {genderDetails && Number(genderDetails?.femaleRate) > 0 && (
                  <div className="flex items-baseline gap-1">
                    <span>{genderDetails.femaleRate}%</span>
                    <Venus className="stroke-pink-600 size-4" />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col justify-end gap-2">
            <div className="flex gap-10 items-start justify-end w-full">
              <span className="w-40 font-medium text-gray-700 text-right shrink-0">
                Egg Cycles
              </span>
              <div className="flex flex-wrap gap-2 w-full">
                <span>{pokemonSpeciesData?.hatch_counter}</span>
                <span>
                  ({calculateEggCycles(pokemonSpeciesData?.hatch_counter)})
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="xl:basis-1/3 xl:shrink-0 flex flex-col gap-4">
        <p className="text-center text-2xl font-semibold uppercase">Forms</p>
        <div className="flex flex-col gap-2 items-center justify-center">
          <div className="w-full flex items-center justify-end gap-2">
            <div className="flex gap-10 items-center justify-end w-full">
              <span className="w-40 font-medium text-gray-700 text-right shrink-0">
                Alternative Forms
              </span>
              <div className="flex flex-wrap gap-2 w-full">
                {Number(pokemonSpeciesData?.varieties.length) > 1
                  ? "Yes"
                  : "No"}
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col justify-end gap-2">
            <div className="flex gap-10 items-start justify-end w-full">
              <span className="w-40 font-medium text-gray-700 text-right shrink-0">
                Gender Differences
              </span>
              <div className="flex flex-wrap gap-2 w-full">
                {Number(pokemonSpeciesData?.gender_rate) > 0 ? "Yes" : "No"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
