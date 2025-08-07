import PokemonEvolution from "./_components/PokemonEvolution";
import PokemonInfo from "./_components/PokemonInfo";
import PokemonTitle from "./_components/PokemonTitle";
import { useFetchPokemonDetails } from "./hooks/use-fetch-pokemon-details";

export default function PokemonDetails() {
  const { pokemonEvolutionData, pokemonData } = useFetchPokemonDetails();
  const pokemonType = pokemonData?.types[0].type.name;
  return (
    <div className="w-full px-12 space-y-10">
      <PokemonTitle />
      <PokemonInfo />
      {pokemonEvolutionData && (
        <PokemonEvolution pokemonEvolution={pokemonEvolutionData} pokemonType={pokemonType}/>
      )}
    </div>
  );
}
