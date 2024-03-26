import React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Landing from "./Landing/Landing.jsx";
import Reviews from "./Reviews/Reviews.jsx";
import OrderContextProvider from "./store/food-order-context.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/Home",
    element: <App />,
  },
  {
    path: "/Reviews",
    element: <Reviews />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <OrderContextProvider>
      <RouterProvider router={router} />
    </OrderContextProvider>
  </React.StrictMode>
);
