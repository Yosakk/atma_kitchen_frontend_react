import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './products'; // Adjust the path if necessary

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

export default store;
