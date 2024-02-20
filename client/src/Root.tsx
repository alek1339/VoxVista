import { Outlet } from "react-router-dom";
import "./Root.css";
import "./styles/styles.scss";
import Navigation from "./components/navigation/Navigation";

function Root() {
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
