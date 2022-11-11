import React, { useState } from 'react'
import "./Login.css"
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { auth } from './FireBase';
import { useDispatch, useSelector } from 'react-redux';
import { login, prevChange, selectPrev} from './features/userSlice';

function Login() {
    const [username, setUsername]= useState("");
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [profilePic, setProfilePic] = useState("")
    const dispatch = useDispatch();
    const prev = useSelector(selectPrev)
    const Register =()=>{
      if(!username){
        return alert("name not entered!");
      }
      
    auth.createUserWithEmailAndPassword(email, password).then((userAuth)=>{
        userAuth.user.updateProfile({
            displayName:username,
            photoURL:profilePic,
        }) 
         .then(()=>{
        dispatch(login({
            email:userAuth.user.email,
            uid:userAuth.user.uid,
            displayName:username,
            photoURL:profilePic,
            }))
         })
         .then(()=>{
          dispatch(prevChange(prev))
         })
    }).catch((error)=>{alert(error.message)})
    }
    
    const loginToApp = (event) =>{
       event.preventDefault()

        auth.signInWithEmailAndPassword(email, password)
        .then((userAuth)=>{
            dispatch(login({
            email:userAuth.user.email,
            uid:userAuth.user.uid,
            displayName:userAuth.user.displayName,
            photoUrl:userAuth.user.photoURL,
            }))
        }).catch((error)=>{alert(error)})
    }

  return (
    <div className="login">
    <LocalFireDepartmentIcon sx={{fontSize: 60}}/>
    <form>
        <input type="text" 
        placeholder='Username' 
        value={username}
         onChange={(event)=>{
            setUsername(event.target.value)
        }}
        />
             <input type="text" 
        placeholder='Profile Picture URL (optional)' 
        value={profilePic}
         onChange={(event)=>{
            setProfilePic(event.target.value)
        }}
        />

        <input type="text"
         placeholder='Email' 
         value={email}
         onChange={(event)=>{
            setEmail(event.target.value)
        }}/>

        <input type="password" 
        placeholder='Password' 
        className='password_input'
        value={password}
         onChange={(event)=>{
            setPassword(event.target.value)
        }}
        />

        <input type="text" 
        placeholder='Admin passcode' 
        value={prev}
         onChange={(event)=>{
            dispatch(prevChange(event.target.value))
        }}
        />

        <button type="submit" onClick={loginToApp}>SIGN IN</button>
    </form>
    <p>Not registered yet?</p>
    <span className="login_register" onClick={Register}>Register Now</span>
    </div>
  )
}

export default Login