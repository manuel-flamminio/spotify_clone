import { createSlice } from "@reduxjs/toolkit";

export const albumSlice = createSlice({
    initialState: {
        selectedAlbum: null
    },
    name: 'album',
    reducers: {
        replaceAlbum: (state, action) => {
            state.selectedAlbum = action.payload;
        }
    }
})

export const {replaceAlbum} = albumSlice.actions

export const selectAlbum = state => state.album.selectedAlbum

export default albumSlice.reducer