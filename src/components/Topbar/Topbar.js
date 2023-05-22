import { useLocation, useNavigate } from "react-router-dom";
import classes from "./Topbar.module.css";

const Topbar = (props) => {
  const navigate = useNavigate();
  const location = useLocation();


  return (
    <div style={props.opacity} className={classes.Topbar}>
      <button
        onClick={() => {
          if (location.key !== "default") navigate(-1);
          else navigate("/");
        }}
        disabled={location.pathname === "/" }
        className={classes.Sign}
      >
        Go Back
      </button>
      <button className={classes.Login}>Log in</button>
    </div>
  );
};

export default Topbar;
