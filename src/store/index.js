import { configureStore } from '@reduxjs/toolkit';
import authSlice from './reducers/userReducer';

export default configureStore({
  reducer: {
    user: authSlice,
  },
});
