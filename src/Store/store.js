import { configureStore } from "@reduxjs/toolkit";
import searchSearchDataReducer from "./Slices/searchDataSlice";

export const store = configureStore({
  reducer: {
    searchData: searchSearchDataReducer,
  },
});
