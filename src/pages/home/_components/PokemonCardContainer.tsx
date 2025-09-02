import type { PokeAPI } from "pokeapi-types";
import { PokemonCard } from "./PokemonCard";
import { useFormContext } from "react-hook-form";
import { useEffect, useMemo, useRef, useState } from "react";
import useResizeObserver from "@/hooks/use-resize-observer";
import { useWindowVirtualizer } from "@tanstack/react-virtual";

// TODO: need to refactor the hooks and constants into separate.

interface PokemonCardContainerProps {
  pokemonData: PokeAPI.Pokemon[];
}
interface FormProps {
  search: string;
  type: string[];
  sort: string;
  layout: string;
}
const BREAKPOINT = {
  xs: 375,
  sm: 640,
  md: 768,
  lg: 1024,
};
const ITEM_RATIO = 0.57 / 1;
export default function PokemonCardContainer({
  pokemonData,
}: PokemonCardContainerProps) {
  const form = useFormContext<FormProps>();
  const filters = form.watch();
  const filteredPokemonData = useMemo(() => {
    const selectedTypes = filters.type.map((t) => t.toLowerCase());

    return pokemonData.filter(
      (pokemon) =>
        selectedTypes.every((selected) =>
          pokemon.types.some(
            (type) => type.type.name.toLowerCase() === selected
          )
        ) && pokemon.name.toLowerCase().includes(filters.search.toLowerCase())
    );
  }, [filters]);

  const parentRef = useRef<HTMLDivElement>(null);

  const getItemWidth = (width: number, columns: number) => {
    return Math.floor((width - (columns - 1) * 10) / columns);
  };

  const getItemHeight = (itemWidth: number) => {
    return itemWidth / ITEM_RATIO;
  };

  const getColumnsCount = (width: number) => {
    switch (true) {
      case width <= BREAKPOINT.sm:
        return 2;
      case width <= BREAKPOINT.md:
        return 3;
      case width <= BREAKPOINT.lg:
        return 5;
      default:
        return 7;
    }
  };

  const initialColumns = getColumnsCount(window.innerWidth);
  const initialItemWidth = getItemWidth(window.innerWidth, initialColumns);
  const initialItemHeight = getItemHeight(initialItemWidth);

  const [columns, setColumns] = useState(initialColumns);
  const [itemSize, setItemSize] = useState({
    width: initialItemWidth,
    height: initialItemHeight,
  });

  const { width: containerWidth } = useResizeObserver(parentRef);

  const rowVirtualizer = useWindowVirtualizer({
    count: Math.ceil(filteredPokemonData.length / columns),
    estimateSize: () => itemSize.height,
    gap: 10,
  });

  const columnVirtualizer = useWindowVirtualizer({
    horizontal: true,
    count: columns,
    estimateSize: () => itemSize.width,
    gap: 10,
  });

  const handleResize = () =>
    setTimeout(() => {
      const column = getColumnsCount(containerWidth);
      const itemWidth = getItemWidth(containerWidth, column);
      const itemHeight = getItemHeight(itemWidth);

      setColumns(column);
      setItemSize({
        width: itemWidth,
        height: itemHeight,
      });
    }, 200);

  useEffect(() => {
    if (!containerWidth) {
      return;
    }

    handleResize();
  }, [containerWidth]);
  return (
    <div ref={parentRef} className="w-full">
      <div className="relative w-[100%]">
        {rowVirtualizer.getVirtualItems().flatMap((virtualRow) =>
          columnVirtualizer.getVirtualItems().map((virtualColumn) => {
            const itemIndex = virtualRow.index * columns + virtualColumn.index;
            if (itemIndex >= filteredPokemonData.length) {
              return null;
            }

            return (
              <div
                key={itemIndex}
                className="absolute top-0 left-0"
                data-index={itemIndex}
                style={{
                  width: itemSize.width,
                  height: itemSize.height,
                  transform: `translate3d(${virtualColumn.start}px, ${virtualRow.start}px, 0)`,
                }}>
                <PokemonCard pokemon={filteredPokemonData[itemIndex]} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
