import { useParams } from "react-router-dom";
import type { PokeAPI } from "pokeapi-types";
import AppIcon from "@/components/common/AppIcon";
import { getAbilityIcon } from "../utils/get-ability-icon";
import { Card, CardDescription } from "@/components/ui/card";
import { getPokemonIdFromUrl } from "@/utils/get-pokemon-id-from-url";
import { useFetchPokemonAbilityDetails } from "@/query/use-fetch-pokemon-ability-details";

interface PokemonStatCardProps {
  pokemonAbility: PokeAPI.PokemonAbility;
}

export default function PokemonStatCard({
  pokemonAbility,
}: PokemonStatCardProps) {
  const { pokemonName } = useParams();
  const { data: abilityData, isLoading: isAbilityDataLoading } =
    useFetchPokemonAbilityDetails({
      abilityId: getPokemonIdFromUrl(pokemonAbility.ability.url),
    });

  if (isAbilityDataLoading || typeof abilityData === "undefined") {
    return (
      <Card className="p-6 rounded-lg shadow-elevation-1 border border-border animate-pulse">
        <CardDescription className="flex items-start space-x-4">
          <div className="p-3 rounded-lg bg-muted flex-shrink-0 w-10 h-10" />
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <div className="h-5 w-12 bg-muted rounded-full" />
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-3/4" />
            </div>
            <div className="mt-3 flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="w-4 h-4 bg-muted rounded-full" />
              <div className="h-4 w-52 bg-muted rounded" />
            </div>
          </div>
        </CardDescription>
      </Card>
    );
  }
  const isHiddenAbility = abilityData?.pokemon.find(
    (ability) => ability.pokemon.name === pokemonName
  )?.is_hidden;
  return (
    <Card className="p-6 rounded-lg shadow-elevation-1 border border-border hover:shadow-elevation-2 transition-shadow duration-200">
      <CardDescription className="flex items-start space-x-4">
        <div
          className={`p-3 rounded-lg ${isHiddenAbility ? "bg-neutral-500/10" : "bg-blue-500/10"} flex-shrink-0`}>
          <AppIcon
            name={getAbilityIcon(abilityData.name)}
            size={24}
            className={isHiddenAbility ? "text-neutral-500" : "text-blue-500"}
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h4 className="text-lg font-semibold text-foreground capitalize">
              {abilityData.name.replace(/-/g, " ")}
            </h4>
            {isHiddenAbility && (
              <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
                Hidden
              </span>
            )}
          </div>
          {abilityData.effect_entries.map((item) => (
            <p
              key={item.short_effect}
              className="text-muted-foreground leading-relaxed">
              {item.short_effect}
            </p>
          ))}

          <div className="mt-3 flex items-center text-sm text-muted-foreground">
            <AppIcon name="info" size={14} className="mr-1" />
            <span>
              {isHiddenAbility
                ? "This is a hidden ability that can only be obtained through special methods."
                : "This is a standard ability for this Pokemon."}
            </span>
          </div>
        </div>
      </CardDescription>
    </Card>
  );
}
