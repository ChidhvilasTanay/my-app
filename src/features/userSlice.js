import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState:{
    user:null,
    currentTab:"Home",
    feedTab:"Announcements",
    prev:"student",
  },
  reducers: {
    login: (state, action) => {
      state.user =action.payload;
    },
    logout: (state) => {
      state.user = null
      state.feedTab="Announcements"
      state.currentTab="Home"
      state.prev="Student"
    },
    feedChange:(state,action) =>{
      state.feedTab=action.payload
    },
     tabChange:(state,action) =>{
      state.currentTab=action.payload
    },
     prevChange:(state,action) =>{
      state.prev=action.payload
    },
  }
});

export const { login, logout,feedChange,tabChange,prevChange } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectFeed = (state) => state.user.feedTab;
export const selectTab = (state) => state.user.currentTab;
export const selectPrev = (state) => state.user.prev;
export default userSlice.reducer;
