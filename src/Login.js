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
    const [member, setMember]= useState(true)
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

  const RenderMember=()=>{
    if(member){
    return(
        <form>
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

        <select value={prev}  className="drop_down" onChange={(event)=>{
            dispatch(prevChange(event.target.value))
        }} >
          <option>student</option>
          <option>faculty</option>
        </select>

        <button type="submit" onClick={loginToApp}>LOGIN</button>
      </form>
    )
    }

    else{
          return(
            <div className="register_div">
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

       <select value={prev}  className="drop_down" onChange={(event)=>{
            dispatch(prevChange(event.target.value))
        }} >
          <option>student</option>
          <option>faculty</option>
        </select>

        <button type="submit" onClick={Register}>SIGN IN</button>
    </div>
          )
    }
  }

  return (
    <div className="login">
    <LocalFireDepartmentIcon sx={{fontSize: 60}}/>
    {RenderMember()}
    {member ? (<div className="member">
      <p>Not registered yet?</p>
    <span className="login_register" onClick={()=>{setMember(false)}}>Register Now</span>
      </div>):(<div className="member">
      <p>Already have an account?</p>
    <span className="login_register" onClick={()=>{setMember(true)}}>Login</span>   
      </div>
      )}
    
    </div>
  )
}

export default Login