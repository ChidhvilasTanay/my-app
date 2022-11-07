import React, { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import "./App.css"
import Header from "./Header"
import Sidebar from './Sidebar'
import Feedbar from './Feedbar'
import RightSidebar from './RightSidebar'
import Login from './Login'
import {login, logout, selectTab, selectUser} from "./features/userSlice"
import { auth } from './FireBase'
import Recordbar from './Recordbar'
import Peoplebar from './Peoplebar'
function App() {
  const user = useSelector(selectUser)
  const currentTab= useSelector(selectTab)
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

  const RenderTab = ()=>{
    switch(currentTab){
    case "Home":
       return(<div className="app_body">
        <Sidebar/>
        <Feedbar/>
        <RightSidebar/>
        </div>)

    case "Records":
       return(<div className="app_body">
        <Recordbar/>
       </div>)

    case "Attendance":
       return(<div className="app_body">
        <h1>attendance</h1>
       </div>)
    
    case "People":
       return(<div className="app_body">
        <h1><Peoplebar/></h1>
       </div>)
    }
  }

   return (
    <div className="app">
      <Header/>
      {!user ? (<Login/>
      ):(
      RenderTab())
      }
    </div>
  )
}

export default App
