import Song from "./Song/Song";
import playIcon from "../../assets/play.png";
import pauseIcon from "../../assets/pause.png";
import classes from "./Songs.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  replacePlayingSong,
  selectIsPlaying,
  selectPlayingSong,
  selectSongs,
  setIsPlaying,
} from "../../redux/songSlice";
import { useMediaQuery } from "react-responsive";

const Songs = (props) => {
  const albumSongs = useSelector(selectSongs);
  const playingSong = useSelector(selectPlayingSong);
  const dispatch = useDispatch();
  const isPlaying = useSelector(selectIsPlaying);
  const isXXSm = useMediaQuery({ maxWidth: 540 });

  let songs = null;
  if (albumSongs.length > 0)
    songs = albumSongs.map((item, index) => (
      <Song
        isXXSm={isXXSm}
        albumID={props.albumID ? props.albumID : item.album ? item.album.id : null}
        key={item.id}
        index={index}
        playingSong={playingSong}
        {...item}
      />
    ));

  const handleButtonClick = () => {
    const firstSong = albumSongs[0].id;
    if (playingSong === null) dispatch(replacePlayingSong(firstSong));
    else dispatch(setIsPlaying(!isPlaying));
  };

  return (
    <div className={classes.Songs}>
      <div className={classes.ButtonRow}>
        <button
          disabled={albumSongs.length === 0}
          onClick={handleButtonClick}
          className={classes.Play}
        >
          <img src={!isPlaying ? playIcon : pauseIcon} />
        </button>
      </div>
      <div className={classes.Header}>
        <span className={classes.Index}>#</span>
        <span>Title</span>
        {!isXXSm ? (
          <>
            <span></span>
            <span>Artist</span>
            <span>Length</span>
          </>
        ) : null}
      </div>
      {songs}
    </div>
  );
};

export default Songs;
