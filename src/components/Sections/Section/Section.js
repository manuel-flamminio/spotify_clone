import { useEffect, useState } from "react";
import axios from "../../../myAxios";
import Cards from "../../Cards/Cards";

const Section = (props) => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    axios
      .get(`sections/${props.section.id}/albums`)
      .then((res) => setAlbums(res.data))
      .catch((err) => console.log(err));
  }, [props.section.id]);

  return (
    <>
      {albums.length > 0 ? (
        <Cards trim={props.trim} title={props.section.name} albums={albums} />
      ) : null}
    </>
  );
};

export default Section;
