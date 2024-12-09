import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myStories: [], // Historias subidas por el usuario
};

const storiesSlice = createSlice({
  name: "storiesProfile",
  initialState,
  reducers: {
    addStoryProfile(state, action) {
      state.myStories.push(action.payload); // Agrega una nueva historia
    },
    removeStory(state, action) {
      state.myStories = state.myStories.filter((story) => story.id !== action.payload.id); // Elimina una historia por ID
    },
    setCategories(state, action) {
      state.categories = action.payload; // Configura las categorías de historias
    },
  },
});

export const { addStory, removeStory, setCategories } = storiesSlice.actions;
export default storiesSlice.reducer;
