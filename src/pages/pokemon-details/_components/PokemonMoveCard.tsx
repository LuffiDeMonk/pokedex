import AppIcon from "@/components/common/AppIcon";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { useFetchPokemonMoveDetails } from "@/query/use-fetch-pokemon-move-details";
import { getPokemonVariant } from "@/utils/get-pokemon-variant";

interface PokemonMoveCardProps {
  move: ReturnType<typeof useFetchPokemonMoveDetails>["data"][number];
  className?: string;
}

export default function PokemonMoveCard({
  move,
  className,
}: PokemonMoveCardProps) {
  const learnMethod =
    move?.version_group_details?.[0].move_learn_method.name ?? "unknown";
  const levelLearned = move?.version_group_details?.[0].level_learned_at ?? 0;
  return (
    <div
      className={cn(
        "bg-card p-4 rounded-lg shadow-elevation-1 border border-border hover:shadow-elevation-2 transition-shadow duration-200",
        className
      )}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h4 className="text-lg font-semibold text-foreground capitalize">
              {move?.name?.replace(/-/g, " ")}
            </h4>

            {move?.type && (
              <Badge
                variant={getPokemonVariant(move.type.name)}
                className="capitalize">
                {move.type.name}
              </Badge>
            )}
          </div>

          {move?.effect_entries
            .filter((item) => item.language.name === "en")
            .map((item) => (
              <p
                className="text-sm text-muted-foreground leading-relaxed mb-3"
                key={item.short_effect}>
                {item.short_effect}
              </p>
            ))}

          <div className="flex items-center space-x-4 text-sm flex-wrap">
            <div className="flex items-center space-x-1">
              <AppIcon
                name="book-open"
                size={14}
                className="text-muted-foreground"
              />
              <span className="text-muted-foreground">
                {learnMethod === "level-up"
                  ? `Level ${levelLearned}`
                  : learnMethod === "machine"
                    ? "TM/TR"
                    : learnMethod === "egg"
                      ? "Egg Move"
                      : learnMethod === "tutor"
                        ? "Move Tutor"
                        : "Unknown"}
              </span>
            </div>

            {move?.power && (
              <div className="flex items-center space-x-1">
                <AppIcon
                  name="zap"
                  size={14}
                  className="text-muted-foreground"
                />
                <span className="text-muted-foreground">
                  Power: {move?.power}
                </span>
              </div>
            )}

            {move?.accuracy && (
              <div className="flex items-center space-x-1">
                <AppIcon
                  name="target"
                  size={14}
                  className="text-muted-foreground"
                />
                <span className="text-muted-foreground">
                  Accuracy: {move?.accuracy}%
                </span>
              </div>
            )}

            {move?.pp && (
              <div className="flex items-center space-x-1">
                <AppIcon
                  name="rotate-ccw"
                  size={14}
                  className="text-muted-foreground"
                />
                <span className="text-muted-foreground">PP: {move?.pp}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
