import Logo from "../Logo/Logo";
import NavItems from "../NavItems/NavItems";
import classes from "./LeftPanel.module.css";
import home from "./../../assets/home.png";
import library from "./../../assets/library.png";
import search from "./../../assets/search.png";

const LeftPanel = () => {
  const items = [
    { icon: home, text: "Home", path: "/" },
    { icon: search, text: "Search", path: "/search" },
  ];

  return (
    <div className={classes.Panel}>
      <div className={classes.Content}>
        <Logo />
        <NavItems items={items} />
      </div>
    </div>
  );
};

export default LeftPanel;
