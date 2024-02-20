import { NavigationComponent } from "./NavigatonTypes";
import { Link } from "react-router-dom";

const Navigation: NavigationComponent = () => {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </ul>
  );
};

export default Navigation;
