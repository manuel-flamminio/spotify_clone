import { createSlice } from "@reduxjs/toolkit";

export const songSlice = createSlice({
  initialState: {
    playingSong: null,
    isPlaying: false,
    currentTime: 0,
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
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload
    }
  },
});

export const { replaceSongs, replacePlayingSong, setIsPlaying, setCurrentTime } =
  songSlice.actions;

export const selectSongs = (state) => state.songs.songs;
export const selectPlayingSong = (state) => state.songs.playingSong;
export const selectIsPlaying = (state) => state.songs.isPlaying;
export const selectCurrentTime = (state) => state.songs.currentTime

export default songSlice.reducer;
