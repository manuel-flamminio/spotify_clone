import Logo from "../Logo/Logo";
import NavItems from "../NavItems/NavItems";
import classes from "./LeftPanel.module.css";
import home from "./../../assets/home.png";
import library from "./../../assets/library.png";
import search from "./../../assets/search.png";

const LeftPanel = (props) => {
  const items = [
    { icon: home, text: "Home" },
    { icon: search, text: "Search" },
    { icon: library, text: "Library" },
  ];

  return (
    <div className={classes.Panel}>
      <div className={classes.Content}>
        <Logo />
        <NavItems items={items} />
        <NavItems items={items.slice(0,2)} /> 
        {/* Playlist al posto di quello sopra */}
      </div>
    </div>
  );
};

export default LeftPanel;
