import { HomeComponent } from "./HomeTypes";
import Notification from "../../components/notification/Notification";

import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useReduxActions";
import {
  clearRegisterSuccess,
  clearLoginSuccess,
} from "../../store/reducers/authSlice";
import { useAppSelector } from "../../hooks/useReduxActions";

const Home: HomeComponent = () => {
  const dispatch = useAppDispatch();
  const { registerSuccess, loginSuccess } = useAppSelector(
    (state) => state.auth
  );
  const [message, setMessage] = useState<string>("");
  const duration: number = 2500;

  useEffect(() => {
    if (registerSuccess) {
      setMessage("Registration successful");
      setTimeout(() => {
        dispatch(clearRegisterSuccess());
        setMessage("");
      }, duration);
    }
    if (loginSuccess) {
      setMessage("Login successful");
      setTimeout(() => {
        dispatch(clearLoginSuccess());
        setMessage("");
      }, duration);
    }
  }, [dispatch, registerSuccess, loginSuccess]);

  return (
    <div>
      {registerSuccess || loginSuccess ? (
        <Notification message={message} duration={duration} />
      ) : (
        ""
      )}
      Home
    </div>
  );
};

export default Home;
