import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profilePicture: "profile1"
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfilePicture: (state, action) => {
      state.profilePicture = action.payload;
    }
  }
});

export const { setProfilePicture } = userSlice.actions;
export default userSlice.reducer;
