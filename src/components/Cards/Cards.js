import Card from "./Card/Card";
import classes from "./Cards.module.css";

const Cards = (props) => {
  let cards = props.albums;

  if (props.trim > 0) cards = cards.slice(0, props.trim);

  const items = cards.map((item, index) => {
    return <Card index={index} card={item} min={props.trim} key={item.id} />;
  });

  return (
    <>
      <h2 className={classes.Title}>{props.title ? props.title : "Albums"}</h2>
      <div className={classes.Cards}>{items}</div>
    </>
  );
};

export default Cards;
