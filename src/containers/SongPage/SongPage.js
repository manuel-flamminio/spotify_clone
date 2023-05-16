import { useEffect } from "react";
import AlbumInfos from "../../components/AlbumInfos/AlbumInfos";
import Songs from "../../components/Songs/Songs";
import axios from "../../myAxios";
import classes from "./SongPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectShade } from "../../redux/uiSlice";
import { replaceSongs } from "../../redux/songSlice";

const SongPage = (props) => {
  const shadeColor = useSelector(selectShade);
  const dispatch = useDispatch();

  useEffect(() => {
    document
      .getElementById("LayoutContentDiv")
      .scroll({ top: 0, behavior: "instant" });
    axios
      .get(`/albums/${props.id}/songs`)
      .then((res) => dispatch(replaceSongs(res.data)))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={classes.Container}>
      <AlbumInfos {...props} />
      <div
        style={{ background: shadeColor }}
        className={classes.BackgroundShade}
      ></div>
      <Songs albumID={props.id} />
    </div>
  );
};

export default SongPage;
