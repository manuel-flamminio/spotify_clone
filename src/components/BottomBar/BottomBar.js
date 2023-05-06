import classes from "./BottomBar.module.css";
import axios from "../../myAxios";
import { createRef, useEffect, useState } from "react";
import Player from "./Player/Player";

const BottomBar = (props) => {
  const audioRef = createRef();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState("");
  const [volume, setVolume] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const [song, setSong] = useState(null);

  useEffect(() => {
    if (!props.songID) return;
    axios
      .get(`/songs/${props.songID}`)
      .then((res) => setSong(res.data))
      .catch((err) => console.log(err));
  }, [props.songID]);

  // console.log(audioRef)
  const onTimeSeeked = (value) => {
    setCurrentTime(value);
    audioRef.current.currentTime = value;
  };

  const onVolumeChange = (value) => {
    setVolume(value);
    audioRef.current.volume = value / 100;
  };

  let component = null;
  if (props.songID != null)
    component = (
      <div className={classes.Bar}>
        <audio
          ref={audioRef}
          autoPlay
          src={`${axios.defaults.baseURL}songs/${props.songID}/audio`}
          onCanPlay={() => {
            setDuration(audioRef.current.duration);
          }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={() => {
            if (audioRef.current) {
              setCurrentTime(audioRef.current.currentTime);
            }
          }}
        />
        <Player
          song={song}
          isPlaying={isPlaying}
          setCurrentTime={onTimeSeeked}
          volume={volume}
          setVolume={onVolumeChange}
          duration={duration}
          currentTime={currentTime}
          audioRef={audioRef}
        />
      </div>
    );

  return <>{component}</>;
};

export default BottomBar;
