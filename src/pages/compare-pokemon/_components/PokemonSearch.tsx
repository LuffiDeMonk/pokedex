import AppIcon from "@/components/common/AppIcon";
import { Input } from "@/components/ui/input";
import { useFetchPokemons } from "@/query/use-fetch-pokemons";
import PokemonSearchCard from "./PokemonSearchCard";
import { useMemo, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useStore } from "@/store";

export default function PokemonSearch() {
  const [search, setSearch] = useState("");
  const { data: pokemonListdata } = useFetchPokemons({ limit: 50 });
  const { selectedPokemon } = useStore();
  const parentDivRef = useRef<HTMLDivElement>(null);
  const filteredList = useMemo(() => {
    const selectedPokemonNames = selectedPokemon.map((item) => item.name);
    const unSelectedPokemons = pokemonListdata.results.filter(
      (item) =>
        !selectedPokemonNames.some((x) => x === item.name) &&
        item.name.includes(search)
    );
    return unSelectedPokemons;
  }, [search, selectedPokemon]);

  const rowVirtualizer = useVirtualizer({
    count: filteredList.length,
    getScrollElement: () => parentDivRef.current,
    estimateSize: () => 115,
    gap: 16,
  });
  return (
    <div className="flex flex-col gap-4 w-full p-4 ">
      <Input
        prefixIcon={
          <AppIcon name="search" className="size-4 stroke-neutral-300" />
        }
        placeholder="Search by pokemon name"
        className="focus-within:ring-blue-500 focus-within:border-transparent placeholder:text-neutral-300"
        onChange={(event) => setSearch(event.target.value)}
      />
      <div
        className="h-[50dvh] overflow-y-auto overflow-x-hidden hide-scrollbar grid grid-cols-1"
        ref={parentDivRef}>
        <div
          className="w-full relative"
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
          }}>
          {rowVirtualizer.getVirtualItems().map((virtualItem) => (
            <div
              className="absolute w-full top-0 left-0"
              key={virtualItem.key}
              data-index={virtualItem.key}
              style={{
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}>
              <PokemonSearchCard
                pokemonName={filteredList[virtualItem.index].name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
