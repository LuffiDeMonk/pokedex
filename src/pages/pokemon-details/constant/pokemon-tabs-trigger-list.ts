import type { IconName } from "lucide-react/dynamic";

export const POKEMON_TABS_TRIGGER_LIST: Array<{
  name: string;
  icon: IconName;
  value: string;
}> = [
  {
    name: "Overview",
    icon: "chart-column",
    value: "overview",
  },
  {
    name: "Stats",
    icon: "zap",
    value: "stats",
  },
  {
    name: "Moves",
    icon: "swords",
    value: "moves",
  },
  {
    name: "Evolution",
    icon: "git-branch",
    value: "evolution",
  },
];
