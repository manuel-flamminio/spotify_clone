import Song from "./Song/Song";
import playIcon from "../../assets/play.png";
import classes from "./Songs.module.css";
import { useDispatch, useSelector } from "react-redux";
import { replacePlayingSong, selectSongs } from "../../redux/songSlice";

const Songs = (props) => {
  const albumSongs = useSelector(selectSongs);
  const dispatch = useDispatch();

  let songs = null;
  if (albumSongs.length > 0)
    songs = albumSongs.map((item, index) => (
      <Song albumID={props.albumID} key={item.id} index={index} {...item} />
    ));

  return (
    <div className={classes.Songs}>
      <div className={classes.ButtonRow}>
        <button
          disabled={albumSongs.length === 0}
          onClick={() => dispatch(replacePlayingSong(albumSongs[0].id))}
          className={classes.Play}
        >
          <img src={playIcon} />
        </button>
      </div>
      <div className={classes.Header}>
        <span className={classes.Index}>#</span>
        <span>Title</span>
        <span></span>
        <span>Artist</span>
        <span>Length</span>
      </div>
      {songs}
    </div>
  );
};

export default Songs;
