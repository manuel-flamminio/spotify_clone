import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  initialState: {
    shadeColor: "",
    scrollYPosition: 0,
  },
  name: "ui",
  reducers: {
    replace: (state, action) => {
      state.shadeColor = action.payload;
    },
    saveScrollYPosition: (state, action) => {
      state.scrollYPosition = action.payload;
    },
  },
});

export const { replace, saveScrollYPosition } = uiSlice.actions;

export const selectShade = (state) => state.ui.shadeColor;
export const selectYPosition = (state) => state.ui.scrollYPosition;

export default uiSlice.reducer;
