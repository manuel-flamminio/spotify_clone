import classes from "./MobilePlayingSongPage.module.css";
import { useSelector } from "react-redux";
import { selectShade } from "../../redux/uiSlice";
import { selectAlbum } from "../../redux/albumSlice";

const MobilePlayingSongPage = (props) => {
  const backgroundShade = useSelector(selectShade);
  const background = "linear-gradient(transparent 0,rgba(0,0,0,.7) 60%)";
  const album = useSelector(selectAlbum)

  return (
    <div
      style={{ background: [background, backgroundShade].join(",") }}
      className={classes.Page}
    >
      <div className={classes.Headers}>
        <button className={classes.BackButton} onClick={() => props.goBack()}>&lt; Back</button>
        <span>{album.title}</span>
      </div>
      <div className={classes.PlayerControls}>{props.player}</div>
    </div>
  );
};

export default MobilePlayingSongPage;
