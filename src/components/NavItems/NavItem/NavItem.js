import classes from "./NavItem.module.css";

const NavItem = (props) => {
  return (
    <div className={classes.Item}>
      <img className={classes.Icon} src={props.icon} />
      <p className={classes.Text}>{props.text}</p>
    </div>
  );
};

export default NavItem;
