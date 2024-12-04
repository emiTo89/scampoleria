import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('scampoUser'))
      ? JSON.parse(localStorage.getItem('scampoUser'))
      : null,
  },
  reducers: {
    login: (state, action) => {
      console.log(action.payload);

      localStorage.setItem(
        'scampoUser',
        JSON.stringify({
          token: action.payload?.token,
          email: action.payload?.email,
          username: action.payload?.username,
        })
      );
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('scampoUser');
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
