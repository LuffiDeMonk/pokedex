import AppIcon from "@/components/common/AppIcon";
import { Image } from "@/components/common/Image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { MAX_POKEMON_COMPARISION_CARD_COUNT } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { useFetchPokemonCardDetails } from "@/query/use-fetch-pokemon-card-details";
import { useStore } from "@/store";
import { getPokemonImage } from "@/utils/get-pokemon-image";
import { getPokemonVariant } from "@/utils/get-pokemon-variant";
import { PokemonSearchCardLoading } from "./PokemonSearchCardLoading";

interface PokemonSearchCardProps {
  pokemonName: string;
}

export default function PokemonSearchCard({
  pokemonName,
}: PokemonSearchCardProps) {
  const { data: pokemonDetails, isLoading: isPokemonDetailsLoading } =
    useFetchPokemonCardDetails({ pokemonName });
  const { addPokemon, selectedPokemon } = useStore();
  const { toast } = useToast();

  if (isPokemonDetailsLoading) {
    return <PokemonSearchCardLoading />;
  }

  const addPokemonToList = () => {
    if (!pokemonDetails) return;

    if (selectedPokemon.length === MAX_POKEMON_COMPARISION_CARD_COUNT) {
      toast({
        title: "Max pokemon added",
        description: `Only ${MAX_POKEMON_COMPARISION_CARD_COUNT} pokemons can be added at a time`,
        variant: "destructive",
      });
      return;
    }
    addPokemon(pokemonDetails);
  };
  return (
    <Card>
      <CardDescription className="flex items-center justify-between p-4">
        <div className="flex gap-2">
          <Image
            className="size-20 shrink-0"
            src={getPokemonImage({ pokemonId: String(pokemonDetails?.id) })}
          />
          <div className="space-y-2">
            <p className="text-xs font-medium">
              #{pokemonDetails?.id?.toString()?.padStart(3, "0")}
            </p>
            <p className="capitalize text-lg">{pokemonDetails?.name}</p>
            <div className="space-x-2">
              {pokemonDetails?.types.map((type) => (
                <Badge
                  variant={getPokemonVariant(type.type.name)}
                  className="text-[10px] font-normal px-1 py-0">
                  {type.type.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <Button size={"icon"} variant={"link"} onClick={addPokemonToList}>
          <AppIcon className="size-4 stroke-neutral-400" name="plus" />
        </Button>
      </CardDescription>
    </Card>
  );
}
