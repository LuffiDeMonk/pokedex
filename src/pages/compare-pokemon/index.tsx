import { useStore } from "@/store";
import React from "react";

export default function ComparePokemon() {
  const selectedPokemon = useStore((state) => state.selectedPokemon);
  console.log(selectedPokemon, "selectedPokemon");
  return <div>ComparePokemon</div>;
}
