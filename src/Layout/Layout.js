import LeftPanel from "../components/LeftPanel/LeftPanel";
import classes from "./Layout.module.css";
import Cards from "../components/Cards/Cards";
import { useMediaQuery } from "react-responsive";
import Topbar from "../components/Topbar/Topbar";
import BottomBar from "../components/BottomBar/BottomBar";
import { useEffect, useState } from "react";
import axios from "./../myAxios";
import SongPage from "../containers/SongPage/SongPage";
import { useDispatch, useSelector } from "react-redux";
import {
  saveScrollYPosition,
  selectShade,
  selectYPosition,
} from "../redux/uiSlice";
import { selectPlayingSong } from "../redux/songSlice";
import {
  replaceAlbum,
  replaceAlbums,
  selectAlbum,
  selectAlbums,
} from "../redux/albumSlice";

const Layout = () => {
  const cards = useSelector(selectAlbums);
  const playingSong = useSelector(selectPlayingSong);
  const selectedAlbum = useSelector(selectAlbum);
  const [scrollValue, setScrollValue] = useState(0);
  const shadeColor = useSelector(selectShade);
  const scrollYPosition = useSelector(selectYPosition);
  const dispatch = useDispatch();

  const SCROLL_MAX_OPACITY = 300;

  useEffect(() => {
    axios
      .get(`albums`)
      .then((res) => dispatch(replaceAlbums(res.data)))
      .catch((err) => console.log(err));
  }, []);

  let resetSelectedAlbum = () => {
    dispatch(replaceAlbum(null));
    document
      .getElementById("LayoutContentDiv")
      .scroll({ top: scrollYPosition, behavior: "instant" });
  };

  let trim = cards.length;

  const isLg = useMediaQuery({ minWidth: 1601 });
  const isMd = useMediaQuery({ minWidth: 1301 });
  const isSm = useMediaQuery({ minWidth: 1001 });
  const isXSm = useMediaQuery({ minWidth: 771 });

  switch (true) {
    case isLg:
      trim = 8;
      break;
    case isMd:
      trim = 6;
      break;
    case isSm:
      trim = 4;
      break;
    case isXSm:
      trim = 3;
      break;
  }

  let topbarOpacity = null;
  let contentAdditionalStyle = null;
  let component = null;
  let backgroundColor = null;

  switch (selectedAlbum) {
    case null:
      component = (
        <>
          <Cards trim={trim} />
          <Cards trim={trim} />
          <Cards trim={trim} />
        </>
      );

      topbarOpacity = { background: "rgba(8,8,8,1)" };
      if (scrollValue < SCROLL_MAX_OPACITY) {
        const opacityLevel = scrollValue / SCROLL_MAX_OPACITY + 0.5;
        topbarOpacity.background = `rgba(8,8,8,${
          opacityLevel > 1 ? 1 : opacityLevel
        })`;
      }

      backgroundColor = classes.Home;
      break;

    default:
      component = <SongPage {...selectedAlbum} />;

      if (scrollValue > 230)
        topbarOpacity = {
          background:
            "linear-gradient(rgba(0,0,0,.3),rgba(0,0,0,.3) 100%),var(--background-noise)".concat(
              ",",
              shadeColor
            ),
        };
      else topbarOpacity = { background: "rgba(8,8,8,0.5)" };
      backgroundColor = classes.Album;
  }

  if (playingSong === null) contentAdditionalStyle = { gridRowEnd: 3 };

  return (
    <div className={classes.Layout}>
      <LeftPanel />
      <Topbar opacity={topbarOpacity} resetCards={resetSelectedAlbum} />
      <div
        id="LayoutContentDiv"
        onScroll={(e) => {
          setScrollValue(e.target.scrollTop);
          if (selectedAlbum === null)
            dispatch(saveScrollYPosition(e.target.scrollTop));
        }}
        style={contentAdditionalStyle}
        className={[classes.Content, backgroundColor].join(" ")}
      >
        {component}
      </div>
      <BottomBar songID={playingSong} />
    </div>
  );
};

export default Layout;
