import AppIcon from "@/components/common/AppIcon";
import type { PokeAPI } from "pokeapi-types";
import PokemonStatCard from "./PokemonStatCard";

interface PokemonStatsProps {
  pokemonDetails: PokeAPI.Pokemon | undefined;
}

export default function PokemonStats({ pokemonDetails }: PokemonStatsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <AppIcon name="zap" size={20} className="mr-2" />
          Pokemon Abilities
        </h3>

        <div className="space-y-4">
          {pokemonDetails?.abilities?.map((pokemonAbility) => (
            <PokemonStatCard
              pokemonAbility={pokemonAbility}
              key={pokemonAbility.ability.name}
            />
          ))}
        </div>
      </div>
      {/* Ability Tips */}
      <div className="bg-gradient-to-r from-accent/10 to-warning/10 p-6 rounded-lg border border-border">
        <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center">
          <AppIcon name="lightbulb" size={20} className="mr-2" />
          Ability Tips
        </h4>

        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-start space-x-2">
            <AppIcon
              name="check-check"
              size={16}
              className="text-success mt-0.5 flex-shrink-0"
            />
            <p>
              <strong className="text-foreground">Standard Abilities:</strong>{" "}
              Every Pokemon of this species can have these abilities. The
              specific ability is determined when the Pokemon is encountered.
            </p>
          </div>

          <div className="flex items-start space-x-2">
            <AppIcon
              name="star"
              size={16}
              className="text-secondary mt-0.5 flex-shrink-0"
            />
            <p>
              <strong className="text-foreground">Hidden Abilities:</strong>{" "}
              These rare abilities can only be obtained through special methods
              like raids, breeding, or special events.
            </p>
          </div>

          <div className="flex items-start space-x-2">
            <AppIcon
              name="zap"
              size={16}
              className="text-primary mt-0.5 flex-shrink-0"
            />
            <p>
              <strong className="text-foreground">Battle Impact:</strong>{" "}
              Abilities can significantly affect battle strategy and Pokemon
              performance in different situations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
