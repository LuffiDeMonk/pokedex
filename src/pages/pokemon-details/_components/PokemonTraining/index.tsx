import { useFetchPokemonTrainingData } from './hooks/use-fetch-pokemon-training-data';

export default function PokemonTrainingData() {
  const { pokemmonMoveDetails } = useFetchPokemonTrainingData();
  console.log(
    pokemmonMoveDetails.filter((move) => move?.type.name === 'Special'),
    'testin move data'
  );
  return (
    <div className="xl:basis-1/3 xl:shrink-0 space-y-4">
      <p className="text-center text-2xl font-semibold uppercase">Training</p>
      <div></div>
    </div>
  );
}
