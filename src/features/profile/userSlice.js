import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  email: null,
  profilePicture: null,
  uid: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action) {
      state.name = action.payload.name || state.name;
      state.email = action.payload.email || state.email;
      state.profilePicture = action.payload.profilePicture || state.profilePicture;
      state.uid = action.payload.uid || state.uid;
    },
    logoutUser(state) {
      state.name = null;
      state.email = null;
      state.profilePicture = null;
      state.uid = null;
    },
  },
});

export const { updateUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
