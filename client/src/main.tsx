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
import ForgottenPassword from "./pages/forgottenPassword/ForgottenPassword.tsx";

import ProtectedRoute from "./components/protectedRoute/ProtectedRoute.tsx";
import PasswordReset from "./pages/passwordReset/PasswordReset.tsx";

import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import translation_en from "../public/locales/en/translation.json";
import translation_bg from "../public/locales/bg/translation.json";
import ProfileSettings from "./pages/profileSettings/ProfileSettings.tsx";
import ChangePassword from "./pages/changePassword/ChangePassword.tsx";

i18next.init({
  interpolation: {
    escapeValue: false,
  },
  lng: "English",
  resources: {
    English: {
      translation: translation_en,
    },
    Bulgarian: {
      translation: translation_bg,
    },
  },
});

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
        path: "/forgot-password",
        element: (
          <ProtectedRoute fromLoginOrRegister={true}>
            <ForgottenPassword />
          </ProtectedRoute>
        ),
      },
      {
        path: "/reset-password/:token",
        element: (
          <ProtectedRoute fromLoginOrRegister={true}>
            <PasswordReset />
          </ProtectedRoute>
        ),
      },
      {
        path: "/change-password",
        element: (
          <ProtectedRoute>
            <ChangePassword />
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
        path: "/profile-settings",
        element: <ProfileSettings />,
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
      <I18nextProvider i18n={i18next}>
        <RouterProvider router={router} />
      </I18nextProvider>
    </React.StrictMode>
  </Provider>
);
