import type { PokeAPI } from "pokeapi-types";
import { create } from "zustand";

interface UseStoreProps {
  selectedPokemon: PokeAPI.Pokemon[];
  addPokemon: (pokemon: PokeAPI.Pokemon) => void;
  removePokemon: (pokemonId: number) => void;
}

export const useStore = create<UseStoreProps>((set) => ({
  selectedPokemon: [],
  addPokemon: (pokemon) =>
    set((state) => ({ selectedPokemon: [...state.selectedPokemon, pokemon] })),
  removePokemon: (pokemonId) =>
    set((state) => ({
      selectedPokemon: state.selectedPokemon.filter(
        (pokemon) => String(pokemon.id) !== String(pokemonId)
      ),
    })),
}));
