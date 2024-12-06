import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [
    {
      name: "Sights",
      stories: [
        { id: 1, image: "../assets/stories/sights1.jpg", title: "Sight 1" },
        { id: 2, image: "../assets/stories/sights2.jpg", title: "Sight 2" },
        { id: 3, image: "../assets/stories/sights3.jpg", title: "Sight 3" },
      ],
    },
    {
      name: "Experience",
      stories: [
        { id: 4, image: "../assets/stories/experience1.jpg", title: "Experience 1" },
        { id: 5, image: "../assets/stories/experience2.jpg", title: "Experience 2" },
        { id: 6, image: "../assets/stories/experience3.jpg", title: "Experience 3" },
      ],
    },
    {
      name: "Arts",
      stories: [
        { id: 7, image: "../assets/stories/arts1.jpg", title: "Arts 1" },
        { id: 8, image: "../assets/stories/arts2.jpg", title: "Arts 2" },
      ],
    },
    {
      name: "Shopping",
      stories: [
        { id: 9, image: "../assets/stories/shopping1.jpg", title: "Shopping 1" },
        { id: 10, image: "../assets/stories/shopping2.jpg", title: "Shopping 2" },
      ],
    },
    {
      name: "Food",
      stories: [
        { id: 11, image: "../assets/stories/food1.jpg", title: "Food 1" },
        { id: 12, image: "../assets/stories/food2.jpg", title: "Food 2" },
        { id: 13, image: "../assets/stories/food3.jpg", title: "Food 3" },
      ],
    },
    {
      name: "Hotels",
      stories: [
        { id: 14, image: "../assets/stories/hotel1.jpg", title: "Hotel 1" },
        { id: 15, image: "../assets/stories/hotel2.jpg", title: "Hotel 2" },
      ],
    },
    {
      name: "Attractions",
      stories: [
        { id: 16, image: "../assets/stories/atractions1.jpg", title: "Attractions 1" },
        { id: 17, image: "../assets/stories/atractions2.jpg", title: "Attractions 2" },
      ],
    },
  ],
  activeCategory: null,
  isModalOpen: false,
};

const storiesSlice = createSlice({
  name: "stories",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.activeCategory = action.payload;
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.activeCategory = null;
    },
  },
});

export const { openModal, closeModal } = storiesSlice.actions;
export default storiesSlice.reducer;
