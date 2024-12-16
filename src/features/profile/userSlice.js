import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
  myStories: [],
  user: {
    name: "",
    email: "",
    profilePicture: "",
    uid: "",
  },
};


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action) {
      return {
        ...state,
        name: action.payload.name || state.name,
        email: action.payload.email || state.email,
        profilePicture: action.payload.profilePicture || state.profilePicture,
        uid: action.payload.uid || state.uid,
      };
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
