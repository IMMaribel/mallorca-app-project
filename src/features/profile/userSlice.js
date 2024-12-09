import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "John Doe",
  email: "johndoe@example.com",
  profilePicture: "../assets/M.png", // Puedes cambiarlo por una URL de tu imagen de perfil
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
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
