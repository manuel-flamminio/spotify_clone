import classes from "./BottomBar.module.css";
import axios from "../../myAxios";
import { createRef, useEffect, useState } from "react";
import Player from "./Player/Player";
import { useDispatch, useSelector } from "react-redux";
import {
  replacePlayingSong,
  selectCurrentTime,
  selectIsPlaying,
  selectSongs,
  setCurrentTime,
  setIsPlaying,
} from "../../redux/songSlice";
import { useMediaQuery } from "react-responsive";
import MobilePlayingSongPage from "../MobilePlayingSongPage/MobilePlayingSongPage";

const BottomBar = (props) => {
  const audioRef = createRef();
  const [currentTime, setLocalCurrentTime] = useState(0);
  const [duration, setDuration] = useState("");
  const [volume, setVolume] = useState(100);
  const [song, setSong] = useState(null);
  const [showSong, setShowSong] = useState(false);
  const isXXSm = useMediaQuery({ maxWidth: 620 });
  const isPlaying = useSelector(selectIsPlaying);
  const songs = useSelector(selectSongs);
  const globalCurrentTime = useSelector(selectCurrentTime);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!props.songID) return;
    axios
      .get(`/songs/${props.songID}`)
      .then((res) => setSong(res.data))
      .catch((err) => console.log(err));
  }, [props.songID]);

  useEffect(() => {
    if (audioRef && audioRef.current) {
      if (isPlaying) audioRef.current.play();
      else audioRef.current.pause();
    }
  }, [isPlaying]);

  const onTimeSeeked = (value) => {
    setLocalCurrentTime(value);
    audioRef.current.currentTime = value;
  };

  const onVolumeChange = (value) => {
    setVolume(value);
    audioRef.current.volume = value / 100;
  };

  const playNextSong = () => {
    if (!songs) return;

    const nextSong = songs.find((song) => song.id > props.songID);
    if (nextSong) dispatch(replacePlayingSong(nextSong.id));
  };

  const player = (
    <Player
      song={song}
      isPlaying={isPlaying}
      setCurrentTime={onTimeSeeked}
      volume={volume}
      setVolume={onVolumeChange}
      duration={duration}
      currentTime={currentTime}
      audioRef={audioRef}
      isXXSm={isXXSm}
      isMobileShowing={showSong}
    />
  );

  const handleShowSong = (showSongValue) => {
    if (!isXXSm) return;
    setShowSong(showSongValue);
    dispatch(setCurrentTime(currentTime));
  };

  let mobileSongPage = null;
  if (isXXSm && showSong)
    mobileSongPage = (
      <MobilePlayingSongPage
        player={player}
        goBack={() => setShowSong(false)}
        song={song}
      />
    );

  if (!isXXSm && showSong) setShowSong(false);

  let component = null;
  if (props.songID != null)
    component = (
      <div onClick={() => handleShowSong(true)} className={classes.Bar}>
        <audio
          ref={audioRef}
          autoPlay
          onLoad={() => onTimeSeeked(globalCurrentTime)}
          onEnded={() => playNextSong()}
          src={`${axios.defaults.baseURL}songs/${props.songID}/audio`}
          onCanPlay={() => {
            setDuration(audioRef.current.duration);
          }}
          onPlay={() => dispatch(setIsPlaying(true))}
          onPause={() => dispatch(setIsPlaying(false))}
          onTimeUpdate={() => {
            if (audioRef.current) {
              setLocalCurrentTime(audioRef.current.currentTime);
            }
          }}
        />
        {!mobileSongPage ? player : null}
      </div>
    );

  return (
    <>
      {mobileSongPage}
      {component}
    </>
  );
};

export default BottomBar;
