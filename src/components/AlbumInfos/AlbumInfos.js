import classes from "./AlbumInfos.module.css";
import axios from "../../myAxios";
import ColorThief from "colorthief";
import { createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { replace, selectShade } from "../../redux/uiSlice";
import { selectSongs } from "../../redux/songSlice";

const AlbumInfos = (props) => {
  const img = createRef();
  const dispatch = useDispatch();
  const shadeColor = useSelector(selectShade);
  const songs = useSelector(selectSongs)
  const background =
    "linear-gradient(transparent 0,rgba(0,0,0,.5) 100%),var(--background-noise)";

  return (
    <div
      style={{ background: background.concat(shadeColor) }}
      className={classes.AlbumInfosContainer}
    >
      <img
        crossOrigin={"anonymous"}
        className={classes.Image}
        src={`${axios.defaults.baseURL}albums/${props.id}/cover`}
        ref={img}
        onLoad={() => {
          const colorThief = new ColorThief();
          const currentImg = img.current;
          const res = colorThief.getColor(currentImg);
          dispatch(replace(`rgb(${res[0]}, ${res[1]}, ${res[2]})`));
        }}
      />
      <div className={classes.AlbumInfos}>
        <h1 className={classes.Title}>{props.title}</h1>
        <p className={classes.Description}>{props.description}</p>
        <div className={classes.OtherInfos}>
          <p>{props.title}</p>
          <p>- {songs.length} songs</p>
        </div>
      </div>
    </div>
  );
};

export default AlbumInfos;
