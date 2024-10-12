import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null, // Load user from local storage
    token: localStorage.getItem('token') || null, // Load token from local storage
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user; // Assuming payload contains a user object
      state.token = action.payload.token; // Store the token
      // Save user and token to local storage
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token); // Save token
    },
    clearUser(state) {
      state.user = null;
      state.token = null;
      // Remove user and token from local storage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
