import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PokemonEvolution from "./PokemonEvolution";
import AppIcon from "@/components/common/AppIcon";
import { getPokemonVariant } from "@/utils/get-pokemon-variant";
import { POKEMON_TABS_TRIGGER_LIST } from "../constant/pokemon-tabs-trigger-list";
import type { PokeAPI } from "pokeapi-types";
import PokemonOverviewTab from "./PokemonOverviewTab";
import PokemonStats from "./PokemonStats";
import PokemonMovesTab from "./PokemonMovesTab";
import { Suspense } from "react";

interface PokemonTabsProps {
  pokemonData: PokeAPI.Pokemon | undefined;
}

export const PokemonTabs = ({ pokemonData }: PokemonTabsProps) => {
  const pokemonBaseType = getPokemonVariant(pokemonData?.types[0].type.name);
  return (
    <Tabs defaultValue={POKEMON_TABS_TRIGGER_LIST[0].value} className="w-full">
      <TabsList className="flex items-center justify-start gap-2 px-10 bg-white">
        {POKEMON_TABS_TRIGGER_LIST.map((trigger) => (
          <TabsTrigger
            value={trigger.value}
            className="px-6 gap-2"
            variant={pokemonBaseType}>
            <AppIcon name={trigger.icon} />
            {trigger.name}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="overview">
        <PokemonOverviewTab pokemonData={pokemonData} />
      </TabsContent>
      <TabsContent value="stats">
        <PokemonStats pokemonDetails={pokemonData} />
      </TabsContent>
      <TabsContent value="moves">
        <Suspense fallback={<>testing suspense</>}>
          <PokemonMovesTab moves={pokemonData?.moves} />
        </Suspense>
      </TabsContent>
      <TabsContent value="evolution">
        <PokemonEvolution />
      </TabsContent>
    </Tabs>
  );
};
