import axios from "../../myAxios";
import { useEffect, useState } from "react";
import Songs from "../../components/Songs/Songs";
import { useDispatch, useSelector } from "react-redux";
import { replaceSongs, selectSongs } from "../../redux/songSlice";
import classes from "./SearchSongPage.module.css";
import searchIcon from '../../assets/search.png'

const SearchSongPage = () => {
  const [songTitle, setSongTitle] = useState("");
  const dispatch = useDispatch();
  const songs = useSelector(selectSongs);

  useEffect(() => {
    axios
      .get(`/songs?title=${songTitle}`)
      .then((res) => dispatch(replaceSongs(res.data)))
      .catch((err) => console.log(err));
  }, [songTitle]);

  return (
    <>
      <div className={classes.BarContainer}>
        <img className={classes.Image} src={searchIcon} />
        <input
          type="text"
          placeholder="Insert Song Title"
          value={songTitle}
          className={classes.SearchBar}
          onChange={(event) => setSongTitle(event.target.value)}
        />
      </div>
      <Songs />
    </>
  );
};

export default SearchSongPage;
