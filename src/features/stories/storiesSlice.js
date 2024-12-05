import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stories: [],
};

const storiesSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {
    setStories: (state, action) => {
      state.stories.push(action.payload);
    },
  },
});

export const { setStories, addStory } = storiesSlice.actions;
export default storiesSlice.reducer;
