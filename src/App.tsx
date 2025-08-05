import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Home from "./pages/home";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="font-Poppins">
      <Home />
      </div>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left"/>
    </QueryClientProvider>
  );
}

export default App;
