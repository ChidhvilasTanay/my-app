import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState:{
    user:null,
    feedTab:"Announcements"
  },
  reducers: {
    login: (state, action) => {
      state.user =action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    feedChange:(state,action) =>{
      state.feedTab=action.payload
    }
  }
});

export const { login, logout,feedChange } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectFeed = (state) => state.user.feedTab;
export default userSlice.reducer;
