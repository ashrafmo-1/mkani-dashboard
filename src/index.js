import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./i18n";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { PermissionsProvider } from "./context/PermissionsContext";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <PermissionsProvider>
          <App />
        </PermissionsProvider>
      </UserProvider>
    </QueryClientProvider>
  </BrowserRouter>
);