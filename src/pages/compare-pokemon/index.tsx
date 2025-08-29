import { useStore } from "@/store";
import PokemonComparisionCard from "./_components/PokemonComparisionCard";
import { MAX_POKEMON_COMPARISION_CARD_COUNT } from "@/constants";
import AppIcon from "@/components/common/AppIcon";
import { Suspense, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import PokemonSearch from "./_components/PokemonSearch";
import Home from "../home";

export default function ComparePokemon() {
  const selectedPokemon = useStore((state) => state.selectedPokemon);
  const [open, setOpen] = useState(false);
  const REMAINING_POKEMON_SLOT =
    MAX_POKEMON_COMPARISION_CARD_COUNT - selectedPokemon.length;
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {selectedPokemon.map((pokemon) => (
          <PokemonComparisionCard pokemon={pokemon} key={pokemon.id} />
        ))}
        {REMAINING_POKEMON_SLOT !== 0 &&
          Array(REMAINING_POKEMON_SLOT)
            .fill(2)
            .map((_, index) => (
              <div
                key={index}
                onClick={() => setOpen(true)}
                className="border-dashed border-2 border-blue-500 min-h-screen flex items-center justify-center flex-col gap-2 cursor-pointer rounded-md">
                <div className="rounded-full size-12 flex items-center justify-center bg-primary/50">
                  <AppIcon name="plus" className="size-10 stroke-white" />
                </div>
                <p className="text-xl font-medium">Add Pokemon</p>
                <p>Select a pokemon to compare</p>
              </div>
            ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <Suspense fallback={<>Loading</>}>
            <Home />
          </Suspense>
        </DialogContent>
      </Dialog>
    </>
  );
}
