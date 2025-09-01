import React, { Suspense } from "react";
import Layout from "./pages/layout";
import { Route, Routes } from "react-router-dom";
import { useScrollToTop } from "./hooks/use-scroll-to-top";

const Home = React.lazy(() => import("./pages/home"));
const PokemonDetails = React.lazy(() => import("./pages/pokemon-details"));
const ComparePokemon = React.lazy(() => import("./pages/compare-pokemon"));

export default function AppRoutes() {
  useScrollToTop();
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Loading Home...</div>}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="pokemon/:pokemonName"
          element={
            <Suspense fallback={<div>Loading Pokémon...</div>}>
              <PokemonDetails />
            </Suspense>
          }
        />
        <Route path="/pokemon/compare-pokemon" element={<ComparePokemon />} />
      </Route>
    </Routes>
  );
}
