import { configureStore } from '@reduxjs/toolkit';

import authReducer from './components/features/userSlice';

import shoppingListReducer from './components/features/shoppingListSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    shoppingList: shoppingListReducer,
  },
});

export default store;
