import classes from "./Card.module.css";
import axios from '../../../myAxios'
import { useDispatch } from "react-redux";
import { replaceAlbum } from "../../../redux/albumSlice";

const Card = (props) => {
  const dispatch = useDispatch()
  let title = props.card.title;

  if (props.min < 6)
    title = props.card.title.slice(0, Math.min(props.min + 11, props.card.title.length));

  if (title.length < props.card.title.length) title = title.concat("...");

  return (
    <div className={classes.Card} onClick={() => dispatch(replaceAlbum(props.card))}>
      <div className={classes.Content}>
        <img
          className={classes.Image}
          src={`${axios.defaults.baseURL}albums/${props.card.id}/cover`}
        />
        <p className={classes.Title}>{title}</p>
        <p className={classes.SubText}>{props.card.description}</p>
      </div>
    </div>
  );
};

export default Card;
