import PokemonBaseStats from "./PokemonBaseStats";
import type { PokeAPI } from "pokeapi-types";
import { getPokemonVariant } from "@/utils/get-pokemon-variant";
import PokemonPhysicalCharacteristics from "./PokemonPhysicalCharacteristics";

interface PokemonOverviewTabProps {
  pokemonData: PokeAPI.Pokemon | undefined;
}

export default function PokemonOverviewTab({
  pokemonData,
}: PokemonOverviewTabProps) {
  return (
    <div className="space-y-6">
      <PokemonBaseStats
        pokemonStats={pokemonData?.stats}
        pokemonType={getPokemonVariant(pokemonData?.types[0].type.name)}
      />
      <PokemonPhysicalCharacteristics pokemonDetails={pokemonData} />
    </div>
  );
}
