import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [
    {
      name: "Sights",
      stories: [
        { id: 1, title: "Sight 1" },
        { id: 2, title: "Sight 2" },
        { id: 3, title: "Sight 3" },
      ],
    },
    {
      name: "Experience",
      stories: [
        { id: 4, title: "Experience 1" },
        { id: 5, title: "Experience 2" },
        { id: 6, title: "Experience 3" },
      ],
    },
    {
      name: "Arts",
      stories: [
        { id: 7, title: "Arts 1" },
        { id: 8, title: "Arts 2" },
      ],
    },
    {
      name: "Shopping",
      stories: [
        { id: 9, title: "Shopping 1" },
        { id: 10, title: "Shopping 2" },
      ],
    },
    {
      name: "Food",
      stories: [
        { id: 11, title: "Food 1" },
        { id: 12, title: "Food 2" },
        { id: 13, title: "Food 3" },
      ],
    },
    {
      name: "Hotels",
      stories: [
        { id: 14, title: "Hotel 1" },
        { id: 15, title: "Hotel 2" },
      ],
    },
    {
      name: "Attractions",
      stories: [
        { id: 16, title: "Attractions 1" },
        { id: 17, title: "Attractions 2" },
      ],
    },
    {
      name: "My Story",
      stories: [],
    },
  ],
  activeCategory: null,
  isModalOpen: false,
  viewedCategories: [],
};

const storiesSlice = createSlice({
  name: "stories",
  initialState,
  reducers: {
    setStories(state, action) {
      state.categories = action.payload;
    },
    openModal(state, action) {
      state.activeCategory = action.payload;
      state.isModalOpen = true;
    },
    closeModal(state) {
      state.isModalOpen = false;
      state.activeCategory = null;
    },
    addStory(state, action) {
      const { categoryName, story } = action.payload;
      const category = state.categories.find(
        (cat) => cat.name === categoryName
      );

      if (category) {
        category.stories.push(story);
      } else {
    // Si la categoría no existe, no la creamos para evitar una nueva burbuja
    console.warn(`La categoría ${categoryName} no está definida.`);
    }
    },
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
      state.isModalOpen = true;
    },
    markCategoryAsViewed(state, action) {
      const categoryIndex = action.payload;
      if (!state.viewedCategories.includes(categoryIndex)) {
        state.viewedCategories.push(categoryIndex);
      }
    },
  },
});

export const { setStories, openModal, closeModal, addStory, setActiveCategory, markCategoryAsViewed } = storiesSlice.actions;

export default storiesSlice.reducer;
