import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./Root.tsx";
import { Provider } from "react-redux";
import store from "./store/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import Login from "./pages/login/Login.tsx";
import Register from "./pages/register/Register.tsx";
import Home from "./pages/home/Home.tsx";
import NotFound from "./pages/notFound/NotFound.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      // Not found 404
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
