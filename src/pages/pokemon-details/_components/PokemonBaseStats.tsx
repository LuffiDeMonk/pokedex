import AnimatedProgressBar from "@/components/common/AnimatedProgressBar";
import { getPokemonCardColor } from "@/utils/get-pokemon-card-background";

import { formatPokemonStatusTitle } from "../utils/formatPokemonStatusTitle";
import type { PokeAPI } from "pokeapi-types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AppIcon from "@/components/common/AppIcon";

interface PokemonBaseStatsProps {
  pokemonStats: PokeAPI.Pokemon["stats"] | undefined;
  pokemonType: string;
}

export default function PokemonBaseStats({
  pokemonStats,
  pokemonType,
}: PokemonBaseStatsProps) {
  if (!pokemonStats) return null;
  const maxStat = Math.max(...pokemonStats.map((stat) => stat.base_stat));
  const calculateStatInPercetage = (baseStat: number) => {
    return (baseStat / maxStat) * 100;
  };
  const totalStats = pokemonStats.reduce((acc, stat) => {
    return acc + stat.base_stat;
  }, 0);
  const STATS_SUMMARY = [
    {
      name: "Total",
      value: totalStats,
    },
    {
      name: "Average",
      value: Math.round(totalStats / pokemonStats.length),
    },
    {
      name: "Highest",
      value: maxStat,
    },
    {
      name: "Lowest",
      value: Math.min(...pokemonStats.map((stat) => stat.base_stat)),
    },
  ];
  return (
    <>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <AppIcon name="bar-chart-3" size={20} className="mr-2" />
          Base Stats
        </h3>
        {pokemonStats?.map((stat, index) => (
          <Card key={index} className="capitalize">
            <CardHeader>{formatPokemonStatusTitle(stat.stat.name)}</CardHeader>
            <CardContent>
              <div className="w-full">
                <AnimatedProgressBar
                  value={calculateStatInPercetage(stat.base_stat)}
                  className="h-4"
                  indicatorClassNames={`${getPokemonCardColor({
                    pokemonType,
                  })}`}
                  max={maxStat}
                  min={0}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader className="text-lg font-semibold text-foreground mb-4 flex items-center justify-start flex-row">
          <AppIcon name="trending-up" size={20} className="mr-2" />
          Stats Summary
        </CardHeader>
        <CardContent className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS_SUMMARY.map((stat) => (
            <div key={stat.name} className="text-center">
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.name}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
