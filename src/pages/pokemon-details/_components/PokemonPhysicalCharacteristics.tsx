import type { PokeAPI } from "pokeapi-types";
import AppIcon from "@/components/common/AppIcon";
import { Card, CardContent } from "@/components/ui/card";
import { formatPokemonWeight } from "../utils/format-pokemon-weight";
import { formatPokemonHeight } from "../utils/format-pokemon-height";
import { useFetchPokemonSpecies } from "@/query/use-fetch-pokemon-species";

interface PokemonPhysicalCharacteristicsProps {
  pokemonDetails: PokeAPI.Pokemon | undefined;
}

export default function PokemonPhysicalCharacteristics({
  pokemonDetails,
}: PokemonPhysicalCharacteristicsProps) {
  const { data: pokemonSpecies } = useFetchPokemonSpecies({
    pokemonName: pokemonDetails?.name as string,
  });

  if (!pokemonDetails) return null;

  const POKEMON_CHARACTERISTICS = [
    {
      name: "Height",
      value: formatPokemonHeight(pokemonDetails.height),
      description:
        pokemonDetails?.height > 2
          ? "Very Tall"
          : pokemonDetails?.height > 1
            ? "Average"
            : "Short",
      icon: (
        <AppIcon
          name="arrow-up"
          size={16}
          className="mr-2 text-muted-foreground"
        />
      ),
    },
    {
      name: "Weight",
      value: formatPokemonWeight(pokemonDetails.weight),
      description:
        pokemonDetails?.weight > 100
          ? "Heavy"
          : pokemonDetails?.weight > 50
            ? "Average"
            : "Light",
      icon: (
        <AppIcon
          name="weight"
          size={16}
          className="mr-2 text-muted-foreground"
        />
      ),
    },
    {
      name: "Experience",
      value: pokemonDetails?.base_experience,
      description: "Experience gained when defeated",
      icon: (
        <AppIcon name="star" size={16} className="mr-2 text-muted-foreground" />
      ),
    },
    {
      name: "Habitat",
      value: pokemonSpecies?.habitat.name ?? "Unknown",
      description: "Natural environment",
      icon: (
        <AppIcon
          name="map-pin"
          size={16}
          className="mr-2 text-muted-foreground"
        />
      ),
    },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <AppIcon name="ruler" size={20} className="mr-2" />
        Physical Characteristics
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {POKEMON_CHARACTERISTICS.map((characteristic) => (
          <Card className="p-6" key={characteristic.name}>
            <CardContent className="flex items-center justify-between p-0">
              <div className="flex items-center">
                {characteristic.icon}
                <span className="font-medium text-foreground">
                  {characteristic.name}
                </span>
              </div>
              <span className="text-lg font-bold capitalize text-foreground">
                {characteristic.value}
              </span>
            </CardContent>
            <p className="text-sm text-muted-foreground mt-1">
              {characteristic.description}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
