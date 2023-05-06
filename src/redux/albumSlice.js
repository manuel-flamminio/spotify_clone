import { createSlice } from "@reduxjs/toolkit";

export const albumSlice = createSlice({
    initialState: {
        selectedAlbum: null,
        albums: []
    },
    name: 'album',
    reducers: {
        replaceAlbum: (state, action) => {
            state.selectedAlbum = action.payload;
        },
        replaceAlbums: (state, action) => {
            state.albums = action.payload
        }
    }
})

export const {replaceAlbum, replaceAlbums} = albumSlice.actions

export const selectAlbum = state => state.album.selectedAlbum
export const selectAlbums = state => state.album.albums

export default albumSlice.reducer