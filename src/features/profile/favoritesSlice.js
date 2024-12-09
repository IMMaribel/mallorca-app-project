import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [], // Aquí se guardarán las tarjetas favoritas
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, action) {
      if (!state.favorites.find((item) => item.id === action.payload.id)) {
        state.favorites.push(action.payload); // Agrega el favorito si no existe
      }
    },
    removeFavorite(state, action) {
      state.favorites = state.favorites.filter((item) => item.id !== action.payload.id); // Elimina el favorito
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
