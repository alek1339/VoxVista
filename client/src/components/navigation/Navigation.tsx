import { NavigationComponent } from "./NavigatonTypes";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useReduxActions";
import { logoutUser } from "../../store/reducers/authSlice";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useReduxActions";
import { useTranslation } from "react-i18next";

const Navigation: NavigationComponent = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { t } = useTranslation();

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      <Navigate to="/login" />;
    });
  };

  const authLinks = (
    <>
      <li>
        <Link to="/">{t("home")}</Link>
      </li>
      <li>
        <Link to="/profile-settings">
          <i className="fas fa-user-cog"></i> {t("profileSettings")}
        </Link>
      </li>
      <li>
        <button onClick={handleLogout}>{t("logout")}</button>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li>
        <Link to="/login">{t("login")}</Link>
      </li>
      <li>
        <Link to="/register">{t("register")}</Link>
      </li>
    </>
  );

  const adminLinks = (
    <>
      <li>
        <Link to="/admin">{t("admin")}</Link>
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
