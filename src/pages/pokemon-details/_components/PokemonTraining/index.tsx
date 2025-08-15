import { formatPokemonCaptureRate } from "@/pages/pokemon-details/utils/fomat-pokemon-capture-rate";
import { formatExperiencePoints } from "@/pages/pokemon-details/utils/format-experience-points";
import { formatFriendshipStat } from "@/pages/pokemon-details/utils/format-friendship-stat";
import type { PokeAPI } from "pokeapi-types";

interface PokemonTrainingDataProps {
  pokemonData: PokeAPI.Pokemon | undefined;
  pokemonSpeciesData: PokeAPI.PokemonSpecies | undefined;
}

export default function PokemonTrainingData({
  pokemonData,
  pokemonSpeciesData,
}: PokemonTrainingDataProps) {
  return (
    <div className="xl:basis-1/3 xl:shrink-0 flex flex-col gap-4">
      <p className="text-center text-2xl font-semibold uppercase">Training</p>
      <div className="w-full flex flex-col justify-end gap-2">
        <div className="flex gap-10 items-start justify-end w-full">
          <span className="w-32 font-medium text-gray-700 text-right shrink-0">
            Catch Rate
          </span>
          <div className="flex flex-wrap gap-2 w-full">
            <span>{pokemonSpeciesData?.capture_rate}</span>
            <span>
              ({formatPokemonCaptureRate(pokemonSpeciesData?.gender_rate)})
            </span>
          </div>
        </div>
        <div className="flex gap-10 items-start justify-end w-full">
          <span className="w-32 font-medium text-gray-700 text-right shrink-0">
            Base Friendship
          </span>
          <div className="flex flex-wrap gap-2 w-full">
            <span>{pokemonSpeciesData?.base_happiness}</span>
            <span>
              ({formatFriendshipStat(pokemonSpeciesData?.base_happiness)})
            </span>
          </div>
        </div>
        <div className="flex gap-10 items-start justify-end w-full">
          <span className="w-32 font-medium text-gray-700 text-right shrink-0">
            Base Exp.
          </span>
          <div className="flex flex-wrap gap-2 w-full">
            {pokemonData?.base_experience}
          </div>
        </div>
        <div className="flex gap-10 items-start justify-end w-full">
          <span className="w-32 font-medium text-gray-700 text-right shrink-0">
            Growth Rate
          </span>
          <div className="flex flex-wrap gap-2 w-full">
            <span className="capitalize">
              {pokemonSpeciesData?.growth_rate.name}
            </span>
            <span>
              ({formatExperiencePoints(pokemonSpeciesData?.growth_rate.name)}{" "}
              Exp.)
            </span>
          </div>
        </div>
        <div className="flex gap-10 items-start justify-end w-full">
          <span className="w-32 font-medium text-gray-700 text-right shrink-0">
            Held Items
          </span>
          <div className="flex flex-col gap-2 w-full">
            {pokemonData?.held_items.length === 0 && <span>None</span>}
            {pokemonData?.held_items.map((item) => (
              <div key={item.item.url} className="space-x-1">
                <span className="capitalize">{item.item.name}</span>
                <span>({item.version_details[0].rarity} %)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
