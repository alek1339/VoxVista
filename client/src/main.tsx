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
import Admin from "./admin/Admin.tsx";
import NotFound from "./pages/notFound/NotFound.tsx";

import ProtectedRoute from "./components/protectedRoute/ProtectedRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <ProtectedRoute fromLoginOrRegister={true}>
            <Register />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <ProtectedRoute fromLoginOrRegister={true}>
            <Login />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin",
        element: (
          <ProtectedRoute isAdminRoute={true}>
            <Admin />
          </ProtectedRoute>
        ),
      },
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
