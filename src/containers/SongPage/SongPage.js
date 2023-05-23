import { useEffect } from "react";
import AlbumInfos from "../../components/AlbumInfos/AlbumInfos";
import Songs from "../../components/Songs/Songs";
import classes from "./SongPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectShade } from "../../redux/uiSlice";
import { useLoaderData, useParams } from "react-router-dom";
import { replaceAlbum } from "../../redux/albumSlice";
import axios from "../../myAxios";
import { replaceSongs } from "../../redux/songSlice";

const SongPage = () => {
  const shadeColor = useSelector(selectShade);
  const album = useLoaderData();
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(replaceAlbum(album));
    axios
      .get(`/albums/${album.id}/songs`)
      .then((res) => dispatch(replaceSongs(res.data)))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={classes.Container}>
      <AlbumInfos {...album} />
      <div
        style={{ background: shadeColor }}
        className={classes.BackgroundShade}
      ></div>
      <Songs albumID={params.albumID} />
    </div>
  );
};

export default SongPage;
