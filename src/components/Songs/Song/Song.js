import { useDispatch } from "react-redux";
import classes from "./Song.module.css";
import { replacePlayingSong } from "../../../redux/songSlice";
import axios from "../../../myAxios";

const Song = (props) => {
  const dispatch = useDispatch();

  return (
    <div
      className={classes.Song}
      onClick={() => dispatch(replacePlayingSong(props.id))}
    >
      <span className={classes.Index}>{props.index + 1}</span>

      <img
        className={classes.Image}
        src={`${axios.defaults.baseURL}albums/${props.albumID}/cover`}
      />
      <span className={classes.Title}>{props.title}</span>

      {!props.isXXSm ? (
        <>
          <span>{props.artist.name}</span>
          <span>3:00</span>
        </>
      ) : null}
    </div>
  );
};

export default Song;
