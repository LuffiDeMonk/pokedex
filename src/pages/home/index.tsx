import { useFetchPokemons } from "@/api/query/use-fetch-pokemons";
import { PokemonCard } from "./_components/PokemonCard";

export default function Home() {
  const { data: pokemonListdata } = useFetchPokemons();
  if (!pokemonListdata) return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-2 lg:px-4 xl:px-6">
      {pokemonListdata.results.map((item, index) => (
        <PokemonCard key={index} pokemonName={item.name} />
      ))}
    </div>
  );
}
