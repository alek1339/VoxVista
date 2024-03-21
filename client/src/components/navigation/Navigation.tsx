import { NavigationComponent } from "./NavigatonTypes";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useReduxActions";
import { logoutUser } from "../../store/reducers/authSlice";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useReduxActions";

const Navigation: NavigationComponent = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

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
        <Link to="/profile-settings">
          <i className="fas fa-user-cog"></i> Profile Settings
        </Link>
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
