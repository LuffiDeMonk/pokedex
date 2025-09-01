import type { PokeAPI } from "pokeapi-types";
import { PokemonCard } from "./PokemonCard";
import { useFormContext } from "react-hook-form";

interface PokemonCardContainerProps {
  pokemonData: PokeAPI.Pokemon[];
}
interface FormProps {
  search: string;
  type: string[];
  sort: string;
  layout: string;
}

export default function PokemonCardContainer({
  pokemonData,
}: PokemonCardContainerProps) {
  const form = useFormContext<FormProps>();
  const filteredPokemonData = () => {
    const selectedTypes = form.getValues("type").map((t) => t.toLowerCase());

    return pokemonData.filter((pokemon) =>
      selectedTypes.every((selected) =>
        pokemon.types.some((type) => type.type.name.toLowerCase() === selected)
      )
    );
  };
  return (
    <div className="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 grid gap-4">
      {filteredPokemonData().map((pokemon, index) => (
        <PokemonCard key={index} pokemon={pokemon} />
      ))}
    </div>
  );
}
