import PokemonInfo from "./_components/PokemonInfo";
import PokemonTitle from "./_components/PokemonTitle";

export default function PokemonDetails() {
  return (
    <div className="w-full">
      <PokemonTitle />
      <PokemonInfo />
    </div>
  );
}
