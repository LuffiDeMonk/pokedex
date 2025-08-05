import Home from "./pages/home";
import { Route, Routes } from "react-router-dom";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PokemonDetails from "./pages/pokemon-details";
import Layout from "./pages/layout";

function App() {
  const queryClient = new QueryClient();
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
