import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  profilePicture: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action) {
      state.name = action.payload.name || state.name;
      state.email = action.payload.email || state.email;
      state.profilePicture = action.payload.profilePicture || state.profilePicture;
    },
    logoutUser(state) {
      state.name = "";
      state.email = "";
      state.profilePicture = "";
    },
  },
});

export const { updateUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
