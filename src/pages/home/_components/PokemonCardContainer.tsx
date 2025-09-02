import type { PokeAPI } from "pokeapi-types";
import { PokemonCard } from "./PokemonCard";
import { useFormContext } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
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
  const filteredPokemonData = () => {
    const selectedTypes = filters.type.map((t) => t.toLowerCase());

    return pokemonData.filter(
      (pokemon) =>
        selectedTypes.every((selected) =>
          pokemon.types.some(
            (type) => type.type.name.toLowerCase() === selected
          )
        ) && pokemon.name.toLowerCase().includes(filters.search.toLowerCase())
    );
  };

  const parentRef = useRef<HTMLDivElement>(null);

  const getItemWidth = (width: number, columns: number, gapX: number) => {
    return Math.floor((width - (columns - 1) * gapX) / columns);
  };

  const getItemHeight = (_width: number, itemWidth: number) => {
    return itemWidth / ITEM_RATIO;
  };
  const getItemGap = (width: number) => {
    // if (width <= BREAKPOINT.xs) {
    //   return {
    //     x: 0,
    //     y: 7.5,
    //   };
    // }

    if (width <= BREAKPOINT.md) {
      return {
        x: 7.5,
        y: 7.5,
      };
    }

    return {
      x: 10,
      y: 10,
    };
  };

  const getColumnsCount = (width: number) => {
    if (width <= BREAKPOINT.xs) {
      return 2;
    }
if (width <= BREAKPOINT.sm) return 2;
    if (width <= BREAKPOINT.md) {
      return 3;
    }

    if (width <= BREAKPOINT.lg) {
      return 5;
    }

    return 7;
  };

  const initialGap = getItemGap(window.innerWidth);
  const initialColumns = getColumnsCount(window.innerWidth);
  const initialItemWidth = getItemWidth(
    window.innerWidth,
    initialColumns,
    initialGap.x
  );
  const initialItemHeight = getItemHeight(window.innerWidth, initialItemWidth);

  const [columns, setColumns] = useState(initialColumns);
  const [_gap, setGap] = useState(initialGap);
  const [itemSize, setItemSize] = useState({
    width: initialItemWidth,
    height: initialItemHeight,
  });

  const { width: containerWidth } = useResizeObserver(parentRef);

  const rowVirtualizer = useWindowVirtualizer({
    count: Math.ceil(filteredPokemonData().length / columns),
    estimateSize: () => itemSize.height,
    gap: 10,
  });

  const columnVirtualizer = useWindowVirtualizer({
    horizontal: true,
    count: columns,
    estimateSize: () => itemSize.width,
    gap: 10,
  });

  useEffect(() => {
    rowVirtualizer.measure();
    columnVirtualizer.measure();
  }, [itemSize.height, columns]);

  const handleResize = () =>
    setTimeout(() => {
      const gap = getItemGap(containerWidth);
      const column = getColumnsCount(containerWidth);
      const itemWidth = getItemWidth(containerWidth, column, gap.x);
      const itemHeight = getItemHeight(containerWidth, itemWidth);

      setGap(gap);
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
            if (itemIndex >= filteredPokemonData().length) {
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
                <PokemonCard pokemon={filteredPokemonData()[itemIndex]} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
