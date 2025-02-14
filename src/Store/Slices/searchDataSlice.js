import { createSlice } from "@reduxjs/toolkit";

const searchDataSlice = createSlice({
  name: "searchData",
  initialState: {
    searchData: [],
  },
  reducers: {
    setSearchData: (state, action) => {
      state.searchData = action.payload;
    },
  },
});

export const { setSearchData } = searchDataSlice.actions;
export default searchDataSlice.reducer;
