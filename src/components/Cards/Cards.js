import { useSelector } from "react-redux";
import Card from "./Card/Card";
import classes from "./Cards.module.css";
import { selectAlbums } from "../../redux/albumSlice";

const Cards = (props) => {
  const cards = useSelector(selectAlbums)
  const visibleItems = cards.slice(0, props.trim);

  const items = visibleItems.map((item, index) => {
    return (
      <Card index={index} card={item} min={props.trim} key={item.id} />
    );
  });

  return (
    <>
      <h2 className={classes.Title}>{props.title ? props.title : 'Titolo'}</h2>
      <div className={classes.Cards}>{items}</div>
    </>
  );
};

export default Cards;
