import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import recipesReducer from '../features/recipesSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipesReducer
  },
});

export default store;