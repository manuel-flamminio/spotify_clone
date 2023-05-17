import classes from "./MobilePlayingSongPage.module.css";
import { useSelector } from "react-redux";
import { selectPlayingSongShade } from "../../redux/uiSlice";

const MobilePlayingSongPage = (props) => {
  const backgroundShade = useSelector(selectPlayingSongShade);
  const background = "linear-gradient(transparent 0,rgba(0,0,0,.7) 60%)";

  return (
    <div
      style={{ background: [background, backgroundShade].join(",") }}
      className={classes.Page}
    >
      <div className={classes.Headers}>
        <button className={classes.BackButton} onClick={() => props.goBack()}>
          &lt; Back
        </button>
        <span>{props.song.album.title}</span>
      </div>
      <div className={classes.PlayerControls}>{props.player}</div>
    </div>
  );
};

export default MobilePlayingSongPage;
