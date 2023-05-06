import { createSlice } from "@reduxjs/toolkit";

export const songSlice = createSlice({
  initialState: {
    playingSong: null,
    songs: [],
  },
  name: "songs",
  reducers: {
    replaceSongs: (state, action) => {
      state.songs = action.payload;
    },
    replacePlayingSong: (state, action) => {
      state.playingSong = action.payload;
    },
  },
});

export const { replaceSongs, replacePlayingSong } = songSlice.actions;

export const selectSongs = (state) => state.songs.songs;
export const selectPlayingSong = (state) => state.songs.playingSong;

export default songSlice.reducer;
