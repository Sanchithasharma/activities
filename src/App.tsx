import "./App.css";
import { ActivityThree } from "./pages/activity-three/index";
import { ActivityTwo } from "./pages/activity-two/index";
import { ActivityOne } from "./pages/activity-one/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route index element={<ActivityOne />} />
            <Route path="2" element={<ActivityTwo />} />
            <Route path="3" element={<ActivityThree />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
