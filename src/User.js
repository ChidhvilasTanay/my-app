import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'
import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/Logout';
import "./User.css"
function User({onClick, avatar, userName}) {
  const user = useSelector(selectUser);
  return (
    <div className='user'>
      <div className="user_tab" >
        {avatar && <Avatar className="user_icon">{user?(user.email[0]):null}</Avatar>}
        <div className="user_tab_name">{userName}</div>
      </div>
      <div clasName="drop_down">
        <div className='drop_down_content'>
          <div className="option" onClick={onClick} ><p>Log out</p><LogoutIcon/></div>
          <div className="option"><p>option 2</p></div>
          <div className="option"><p>option 3</p></div>
        </div>
      </div>
    </div>
  )
}

export default User