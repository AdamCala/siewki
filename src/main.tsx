import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./routes/errorPage.tsx";
import Root from "./routes/root.tsx";
import "./index.css";
import Siewki from "./routes/siewki.tsx";
import { Provider } from "react-redux";
import { store } from "./store.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/siewki",
    element: <Siewki />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <RouterProvider router={router}></RouterProvider>
    {/* </Provider> */}
  </React.StrictMode>
);
