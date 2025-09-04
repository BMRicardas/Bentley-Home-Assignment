import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { PaginationProvider } from "./context/pagination/pagination.provider.tsx";
import { App } from "./app.tsx";

import "./index.css";
import "./styles/reset.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PaginationProvider>
      <App />
    </PaginationProvider>
  </StrictMode>
);
