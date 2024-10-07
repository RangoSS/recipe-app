import { createSlice } from '@reduxjs/toolkit';

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState: [],
  reducers: {
    addShoppingList(state, action) {
      state.push(action.payload);
    },
    updateShoppingList(state, action) {
      const index = state.findIndex(list => list.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteShoppingList(state, action) {
      return state.filter(list => list.id !== action.payload);
    },
    setShoppingLists(state, action) {
      return action.payload;
    },
  },
});

export const { addShoppingList, updateShoppingList, deleteShoppingList, setShoppingLists } = shoppingListSlice.actions;
export default shoppingListSlice.reducer;
