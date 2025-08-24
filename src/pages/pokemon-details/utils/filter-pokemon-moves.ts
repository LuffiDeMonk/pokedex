import type { useFetchPokemonMoveDetails } from "@/query/use-fetch-pokemon-move-details";
import type { FilterForm } from "../constant/form-schema";

interface FilterPokemonMovesProps {
  moves: ReturnType<typeof useFetchPokemonMoveDetails>["data"];
  filters: FilterForm;
}

export const filterPokemonMoves = ({
  moves,
  filters,
}: FilterPokemonMovesProps) => {
  const filteredMoves = moves.filter(
    (move) =>
      move?.version_group_details?.[0]?.move_learn_method?.name ===
        filters.learn_method &&
      move.type.name === filters.selectedType &&
      move.damage_class.name === filters.selectedCategory &&
      (!filters.search ||
        move.name.toLowerCase().includes(filters.search.toLowerCase()))
  );

  filteredMoves?.sort((a, b) => {
    switch (filters.sortBy) {
      case "level":
        return (
          (a?.version_group_details?.[0]?.level_learned_at || 0) -
          (b?.version_group_details?.[0]?.level_learned_at || 0)
        );
      case "name":
        return a?.name?.localeCompare(b?.name);
      case "power":
        return (b?.power || 0) - (a?.power || 0);
      case "accuracy":
        return (b?.accuracy || 0) - (a?.accuracy || 0);
      case "type":
        return (a?.type.name || "")?.localeCompare(b?.type.name || "");
      default:
        return 0;
    }
  });
  return filteredMoves;
};
