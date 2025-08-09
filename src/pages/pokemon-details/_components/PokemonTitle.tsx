import PokemonStatusBadge from "@/components/common/PokemonStatusBadge";
import { getPokemonCardColor } from "@/utils/get-pokemon-card-background";
import { useFetchPokemonDetails } from "../hooks/use-fetch-pokemon-details";

export default function PokemonTitle() {
  const { pokemonData: pokemonStats, pokemonSpeciesData } =
    useFetchPokemonDetails();

  return (
    <div>
      <div className="flex items-center justify-center flex-col space-y-3">
        <p className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium capitalize">
          {pokemonStats?.name}
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          {pokemonSpeciesData?.genera?.map((type, index) => (
            <PokemonStatusBadge
              key={index}
              type={type.genus}
              className={`${getPokemonCardColor({
                pokemonType: pokemonStats?.types[0].type.name,
              })} text-white text-sm px-4 font-normal xl:text-base max-w-full`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
