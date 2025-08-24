import React from "react";
import Layout from "./pages/layout";
import { Route, Routes } from "react-router-dom";
import { queryClient } from "./utils/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const Home = React.lazy(() => import("./pages/home"));
const PokemonDetails = React.lazy(() => import("./pages/pokemon-details"));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="pokemon/:pokemonName" element={<PokemonDetails />} />
        </Route>
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
    </QueryClientProvider>
  );
}

export default App;
