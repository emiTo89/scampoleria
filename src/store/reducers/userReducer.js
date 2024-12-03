import { createSlice } from '@reduxjs/toolkit';

const userInStorage = JSON.parse(localStorage.getItem('scampoUser'));

export const authSlice = createSlice({
  name: 'auth',
  initialState: userInStorage ? userInStorage : null,
  reducers: {
    login: (state, action) => {
      localStorage.setItem(
        'scampoUser',
        JSON.stringify({ token: action.payload.token })
      );
      return action.payload;
    },
    logout: (state) => {
      return null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
