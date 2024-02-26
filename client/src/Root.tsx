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

function Root() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);

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
        <Outlet />
      </div>
    </>
  );
}

export default Root;
