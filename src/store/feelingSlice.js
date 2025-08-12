import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  feeling: "😊"  
};

const feelingSlice = createSlice({
  name: "feeling",
  initialState,
  reducers: {
    setFeeling: (state, action) => {
      state.feeling = action.payload;
    }
  }
});

export const { setFeeling } = feelingSlice.actions;
export default feelingSlice.reducer;
