import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { PermissionsProvider } from "./context/PermissionsContext";
import "./i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
      <UserProvider>
        <PermissionsProvider>
          <App />
        </PermissionsProvider>
      </UserProvider>
    </BrowserRouter>
);