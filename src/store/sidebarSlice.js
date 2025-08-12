import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: false, // isOpen
  reducers: {
    toggleSidebar: (state) => !state,
    setSidebar: (_, action) => action.payload
  }
});

export const { toggleSidebar, setSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
