import classes from "./Player.module.css";
import mobileClasses from "./MobilePlayer.module.css";
import playIcon from "../../../assets/play.png";
import pauseIcon from "../../../assets/pause.png";
import ColorThief from "colorthief";
import { createRef } from "react";
import axios from "../../../myAxios";
import { useDispatch } from "react-redux";
import { setIsPlaying } from "../../../redux/songSlice";
import { replacePlayingSongShadeColor } from "../../../redux/uiSlice";

const Player = (props) => {
  const img = createRef();
  const dispatch = useDispatch();
  const style = props.isMobileShowing ? mobileClasses : classes;

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
    <div className={style.PlayerButtons}>
      <button
        onClick={(event) => {
          event.stopPropagation();
          dispatch(setIsPlaying(!props.isPlaying));
        }}
      >
        <img src={props.isPlaying ? pauseIcon : playIcon} />
      </button>
    </div>
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
        <div className={style.SongInfosContainer}>
          <img
            crossOrigin={"anonymous"}
            src={`${axios.defaults.baseURL}albums/${props.song.album.id}/cover`}
            ref={img}
            onLoad={() => {
              const colorThief = new ColorThief();
              const currentImg = img.current;
              const res = colorThief.getColor(currentImg);
              dispatch(
                replacePlayingSongShadeColor(
                  `rgb(${res[0]}, ${res[1]}, ${res[2]})`
                )
              );
            }}
          />
          <div className={style.SongInfos}>
            <span>{props.song.title}</span>
            <span className={style.Artist}>{props.song.artist.name}</span>
          </div>
        </div>

        {!props.isXXSm || props.isMobileShowing ? (
          <>
            <div className={style.PlayerControls}>
              {playPauseButton}
              <div className={style.TimeBar}>
                <span>{formatTime(props.currentTime)}</span>
                {timeBar}
                <span>{formatTime(props.duration)}</span>
              </div>
            </div>

            {!props.isMobileShowing ? (
              <div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={props.volume}
                  onChange={(event) => props.setVolume(event.target.value)}
                ></input>
              </div>
            ) : null}
          </>
        ) : (
          playPauseButton
        )}
      </>
    );
  }

  return <>{component}</>;
};

export default Player;
