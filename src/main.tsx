import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import { store } from "./store";

/**
 * Entry point for the React application.
 * Renders the entire app inside a StrictMode, utilizing BrowserRouter for routing
 * and Redux Provider for state management.
 * @param {HTMLElement} rootElement The root HTML element to render the app into.
 */
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

/**
 * Render the React application into the root element.
 * Utilizes StrictMode, BrowserRouter for routing, and Redux Provider for state management.
 */
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
