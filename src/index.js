import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import "./i18n";
import App from "./App";
import AppProviders from "./providers/app_providers";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <AppProviders>
        <App />
    </AppProviders>
);