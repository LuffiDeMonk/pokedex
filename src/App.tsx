import React, { Suspense } from "react";
import Layout from "./pages/layout";
import { Route, Routes } from "react-router-dom";
import { queryClient } from "./utils/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const Home = React.lazy(() => import("./pages/home"));
const PokemonDetails = React.lazy(() => import("./pages/pokemon-details"));
const ComparePokemon = React.lazy(() => import("./pages/compare-pokemon"));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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

      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
    </QueryClientProvider>
  );
}

export default App;
