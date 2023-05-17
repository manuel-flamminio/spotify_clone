import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  initialState: {
    shadeColor: "",
    playingSongShadeColor: "",
    scrollYPosition: 0,
  },
  name: "ui",
  reducers: {
    replaceShadeColor: (state, action) => {
      state.shadeColor = action.payload;
    },
    replacePlayingSongShadeColor: (state, action) => {
      state.playingSongShadeColor = action.payload;
    },
    saveScrollYPosition: (state, action) => {
      state.scrollYPosition = action.payload;
    },
  },
});

export const { replaceShadeColor, saveScrollYPosition, replacePlayingSongShadeColor } = uiSlice.actions;

export const selectShade = (state) => state.ui.shadeColor;
export const selectPlayingSongShade = (state) => state.ui.playingSongShadeColor;
export const selectYPosition = (state) => state.ui.scrollYPosition;

export default uiSlice.reducer;
