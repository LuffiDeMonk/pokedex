import { queryClient } from "./utils/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
    </QueryClientProvider>
  );
}

export default App;
