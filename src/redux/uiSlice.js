import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
    initialState: {
        shadeColor: ""
    },
    name: 'ui',
    reducers: {
        replace: (state, action) => {
            state.shadeColor = action.payload;
        }
    }
})

export const {replace} = uiSlice.actions

export const selectShade = state => state.ui.shadeColor

export default uiSlice.reducer