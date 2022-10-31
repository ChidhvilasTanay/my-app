import React, { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import "./App.css"
import Header from "./Header"
import Sidebar from './Sidebar'
import Feedbar from './Feedbar'
import RightSidebar from './RightSidebar'
import Login from './Login'
import {login, logout, selectUser} from "./features/userSlice"
import { auth } from './FireBase'
function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch();

  useEffect(()=>{
    auth.onAuthStateChanged((userAuth)=>{
      if(userAuth){
        dispatch(
          login({
           email:userAuth.email,
            uid:userAuth.uid,
            displayName:userAuth.displayName,
            photoUrl:userAuth.photoURL
        }));
      }
      else{
        dispatch(logout());
      }
    })

  },[])


  return (
    <div className="app">
      <Header/>
      {!user ? (<Login/>
      ):(
      <div className="app_body">
         <Sidebar />
         <Feedbar/>
         <RightSidebar/>
      </div>)
      }
    </div>
  )
}

export default App
