import type { PokeAPI } from "pokeapi-types";
import { create } from "zustand";

interface UseStoreProps {
  selectedPokemon: PokeAPI.Pokemon[];
  addPokemon: (pokemon: PokeAPI.Pokemon) => void;
}

export const useStore = create<UseStoreProps>((set) => ({
  selectedPokemon: [],
  addPokemon: (pokemon) =>
    set((state) => ({ selectedPokemon: [...state.selectedPokemon, pokemon] })),
}));
