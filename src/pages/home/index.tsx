import { useFetchPokemons } from '@/query/use-fetch-pokemons';
import { PokemonCard } from './_components/PokemonCard';

export default function Home() {
  const { data: pokemonListdata } = useFetchPokemons({ limit: 50 });
  if (!pokemonListdata) return null;
  return (
    <div className="grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 grid gap-4">
      {pokemonListdata.results.map((item, index) => (
        <PokemonCard key={index} pokemonName={item.name} />
      ))}
    </div>
  );
}
