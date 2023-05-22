import LeftPanel from "../components/LeftPanel/LeftPanel";
import classes from "./Layout.module.css";
import { useMediaQuery } from "react-responsive";
import Topbar from "../components/Topbar/Topbar";
import BottomBar from "../components/BottomBar/BottomBar";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  saveScrollYPosition,
  selectShade,
  selectYPosition,
} from "../redux/uiSlice";
import { selectPlayingSong } from "../redux/songSlice";
import { Outlet, useParams } from "react-router-dom";

const Layout = () => {
  const playingSong = useSelector(selectPlayingSong);
  const [scrollValue, setScrollValue] = useState(0);
  const shadeColor = useSelector(selectShade);
  const scrollYPosition = useSelector(selectYPosition);
  const dispatch = useDispatch();
  const params = useParams();
  const contentDiv = useRef(null);

  const SCROLL_MAX_OPACITY = 300;
  const isXXSm = useMediaQuery({ maxWidth: 770 });

  useEffect(() => {
    if (params.albumID === undefined) handleScroll(scrollYPosition);
    else handleScroll(0);
  }, [params]);

  let topbarOpacity = null;
  let contentAdditionalStyle = null;
  let backgroundColor = null;

  const handleScroll = (scrollYTop) => {
    if (!contentDiv) return;

    contentDiv.current.scroll({
      top: scrollYTop,
      behavior: "instant",
    });
  };

  switch (params.albumID) {
    case undefined:
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
      {!isXXSm ? <LeftPanel /> : null}
      <Topbar opacity={topbarOpacity} />
      <div
        ref={contentDiv}
        onScroll={(e) => {
          setScrollValue(e.target.scrollTop);
          if (params.albumID === undefined && e.target.scrollTop !== 0)
            dispatch(saveScrollYPosition(e.target.scrollTop));
        }}
        style={contentAdditionalStyle}
        className={[classes.Content, backgroundColor].join(" ")}
      >
        <Outlet />
      </div>
      <BottomBar songID={playingSong} />
    </div>
  );
};

export default Layout;
