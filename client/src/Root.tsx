import { Outlet } from "react-router-dom";
import { tokenLogin } from "./store/reducers/authSlice";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks/useReduxActions";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import "./Root.css";
import "./styles/styles.scss";
import Navigation from "./components/navigation/Navigation";
import { logoutUser } from "./store/reducers/authSlice";

import "@fortawesome/fontawesome-free/css/all.css";
import LanguageManager from "./components/languageManager/LanguageManager";
import { useAppSelector } from "./hooks/useReduxActions";

function Root() {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken && decodedToken.exp && decodedToken.exp < currentTime) {
        dispatch(logoutUser());
      }
      dispatch(tokenLogin(token));
    } else {
      dispatch(logoutUser());
    }
  }, [dispatch]);

  return (
    <>
      <Navigation />
      <div id="detail">
        <LanguageManager user={user} />
        <Outlet />
      </div>
    </>
  );
}

export default Root;
