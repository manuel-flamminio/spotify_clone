import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import uiSlice from "./redux/uiSlice";
import songSlice from "./redux/songSlice";
import albumSlice from "./redux/albumSlice";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import SongPage from "./containers/SongPage/SongPage";
import Sections from "./components/Sections/Sections";
import { sectionLoader, albumLoader } from "./routing/Loader";
import ErrorPage from "./routing/ErrorPage/ErrorPage";
import SearchSongPage from "./containers/SearchSongPage/SearchSongPage";

const root = ReactDOM.createRoot(document.getElementById("root"));

const store = configureStore({
  reducer: {
    ui: uiSlice,
    songs: songSlice,
    album: albumSlice,
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            index: true,
            loader: sectionLoader,
            element: <Sections />,
          },
          {
            path: "albums/:albumID",
            loader: albumLoader,
            element: <SongPage />,
          },
          {
            path: "search",
            element: <SearchSongPage />,
          },
        ],
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
