import classes from "./Topbar.module.css";

const Topbar = (props) => {
  return (
    <div style={props.opacity} className={classes.Topbar}>
      <button onClick={() => props.resetCards()} className={classes.Sign}>Go Back</button>
      <button className={classes.Login}>Log in</button>
    </div>
  );
};

export default Topbar;
