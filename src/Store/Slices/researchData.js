import { createSlice } from '@reduxjs/toolkit'

const ResearchDetailsSlic = createSlice({
    name: "researchdetails",
    initialState: {
        research_details: {},
    },
    reducers: {
      setresearchData: (state, action) => {
        state.research_details = action.payload;
      },
    },
  });
  
  export const { setresearchData } = ResearchDetailsSlic.actions;
  export default ResearchDetailsSlic.reducer;