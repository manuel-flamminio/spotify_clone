import { NavLink } from "react-router-dom";
import classes from "./NavItem.module.css";

const NavItem = (props) => {
  const active = [classes.Item,classes.Active].join(" ")
  return (
    <NavLink to={props.path} className={({isActive, isPending}) => isActive ? active : classes.Item}>
      <img className={classes.Icon} src={props.icon} />
      <p className={classes.Text}>{props.text}</p>
    </NavLink>
  );
};

export default NavItem;
