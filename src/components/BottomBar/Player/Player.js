import classes from "./Player.module.css";
import playIcon from "../../../assets/play.png";
import pauseIcon from "../../../assets/pause.png";
import axios from "../../../myAxios";

const Player = (props) => {
  let timeBar = (
    <input
      type="range"
      onChange={(event) => {
        props.setCurrentTime(event.target.value);
      }}
      min={0}
      max={props.duration}
      value={props.currentTime}
    ></input>
  );

  let playPauseButton = (
    <button
      onClick={() =>
        props.isPlaying
          ? props.audioRef.current.pause()
          : props.audioRef.current.play()
      }
    >
      <img src={props.isPlaying ? pauseIcon : playIcon} />
    </button>
  );

  const formatTime = (timeMs) => {
    timeMs = Math.round(timeMs);
    let seconds = timeMs % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return `${Math.floor(timeMs / 60)}:${seconds}`;
  };

  let component = null;
  if (props.song) {
    component = (
      <>
        <div className={classes.SongInfosContainer}>
          <img
            src={`${axios.defaults.baseURL}albums/${props.song.album.id}/cover`}
          />
          <div className={classes.SongInfos}>
            <span>{props.song.title}</span>
            <span className={classes.Artist}>{props.song.artist.name}</span>
          </div>
        </div>
        <div className={classes.PlayerControls}>
          <div className={classes.PlayerButtons}>{playPauseButton}</div>
          <div className={classes.TimeBar}>
            <span>{formatTime(props.currentTime)}</span>
            {timeBar}
            <span>{formatTime(props.duration)}</span>
          </div>
        </div>
        <div>
          <input
            type="range"
            min={0}
            max={100}
            value={props.volume}
            onChange={(event) => props.setVolume(event.target.value)}
          ></input>
        </div>
      </>
    );
  }

  return <>{component}</>;
};

export default Player;
