import { useFetchPokemonMoveDetails } from "@/query/use-fetch-pokemon-move-details";
import type { PokeAPI } from "pokeapi-types";
import { filterPokemonMoves } from "../utils/filter-pokemon-moves";
import { useFormContext } from "react-hook-form";
import type { FilterForm } from "../constant/form-schema";
import PokemonMoveCard from "./PokemonMoveCard";
import AppIcon from "@/components/common/AppIcon";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PokemonContainerProps {
  moves: PokeAPI.PokemonMove[] | undefined;
}

export default function PokemonMovesContainer({
  moves,
}: PokemonContainerProps) {
  const form = useFormContext<FilterForm>();
  const { data: pokemonMovesDetails } = useFetchPokemonMoveDetails({
    moves: moves as PokeAPI.Pokemon["moves"],
  });
  const selectedFilters = form?.watch();
  const filteredData = filterPokemonMoves({
    filters: selectedFilters,
    moves: pokemonMovesDetails,
  });
  const [selecltedMove, setSelectedMove] = useState<
    ReturnType<typeof useFetchPokemonMoveDetails>["data"][number] | undefined
  >();

  if (filteredData.length === 0) {
    return (
      <div className="text-center py-12">
        <AppIcon
          name="search"
          size={48}
          className="mx-auto text-muted-foreground mb-4"
        />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No moves found
        </h3>
        <p className="text-muted-foreground">
          Try adjusting your filters to see more moves.
        </p>
      </div>
    );
  }
  return (
    <>
      <div className="space-y-3 hide-scrollbar max-h-[80dvh] overflow-hidden overflow-y-auto">
        {filteredData?.map((move) => (
          <div
            className="w-full"
            key={move.id}
            onClick={() => setSelectedMove(move)}>
            <PokemonMoveCard move={move} className="cursor-pointer" />
          </div>
        ))}
      </div>
      <Dialog
        open={!!selecltedMove}
        onOpenChange={() => setSelectedMove(undefined)}>
        <DialogContent>
          <DialogHeader className="text-xl">{selecltedMove?.name}</DialogHeader>
          <DialogDescription>
            {selecltedMove?.effect_entries.map((move, index) => (
              <span key={index} className="text-center">
                {move.effect}
              </span>
            ))}
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
