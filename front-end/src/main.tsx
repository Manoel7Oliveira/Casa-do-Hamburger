import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { UserProvider } from "./contexts/UserProvider";

import Router from "./router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <Router />
    </UserProvider>
  </StrictMode>,
);
