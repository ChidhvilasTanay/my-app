import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState:{
    user:null,
    currentTab:"Home",
    feedTab:"Announcements"
  },
  reducers: {
    login: (state, action) => {
      state.user =action.payload;
    },
    logout: (state) => {
      state.user = null
      state.feedTab="Announcements"
      state.currentTab="Home"
    },
    feedChange:(state,action) =>{
      state.feedTab=action.payload
    },
     tabChange:(state,action) =>{
      state.currentTab=action.payload
    }
  }
});

export const { login, logout,feedChange,tabChange } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectFeed = (state) => state.user.feedTab;
export const selectTab = (state) => state.user.currentTab;
export default userSlice.reducer;
