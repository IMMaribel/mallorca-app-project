import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/theme/themeSlice';
import languageReducer from '../features/language/languageSlice';
import storiesReducer from '../features/stories/storiesSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    language: languageReducer,
    stories: storiesReducer,
  },
});
