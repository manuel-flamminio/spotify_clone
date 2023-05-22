import axios from "../myAxios";

export const sectionLoader = async () => {
  const sections = await axios.get(`sections`);
  return sections.data;
};

export const albumLoader = async ({ params }) => {
  const album = await axios.get(`/albums/${params.albumID}`);
  return album.data;
};