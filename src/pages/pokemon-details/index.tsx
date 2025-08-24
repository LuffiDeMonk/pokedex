import PokemonHeroSection from "./_components/PokemonHeroSection";
import { useFetchPokemonDetails } from "./hooks/use-fetch-pokemon-details";
import { PokemonTabs } from "./_components/PokemonTabs";

export default function PokemonDetails() {
  const { pokemonData, pokemonSpeciesData, isLoading } =
    useFetchPokemonDetails();

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <div>
      <PokemonHeroSection
        pokemonDetails={pokemonData}
        pokemonSpeciesData={pokemonSpeciesData}
      />
      <PokemonTabs pokemonData={pokemonData} />
    </div>
  );
}
