import { createSlice } from '@reduxjs/toolkit'

const SubscriptioSlic = createSlice({
    name: "subscription",
    initialState: {
        subscription: false,
    },
    reducers: {
      setisSubed: (state, action) => {
        state.subscription = true;
      },
    },
  });
  
  export const { setisSubed } = SubscriptioSlic.actions;
  export default SubscriptioSlic.reducer;