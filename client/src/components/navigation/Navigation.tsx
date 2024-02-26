import { NavigationComponent } from "./NavigatonTypes";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useReduxActions";
import { logoutUser } from "../../store/reducers/authSlice";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Navigation: NavigationComponent = () => {
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      <Navigate to="/login" />;
    });
  };

  const authLinks = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <button onClick={handleLogout}>Logout</button>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </>
  );

  const adminLinks = (
    <>
      <li>
        <Link to="/admin">Admin</Link>
      </li>
    </>
  );

  return (
    <ul>
      {user ? authLinks : guestLinks}
      {user && user.isAdmin ? adminLinks : null}
    </ul>
  );
};

export default Navigation;
