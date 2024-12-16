import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/theme/themeSlice';
import languageReducer from '../features/language/languageSlice';
import storiesReducer from "../features/stories/storiesSlice";
import userReducer from "../features/profile/userSlice";
import favoritesReducer from "../features/profile/favoritesSlice"

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    language: languageReducer,
    stories: storiesReducer,
    user: userReducer,
    favorites: favoritesReducer,
  },
});

export default store;