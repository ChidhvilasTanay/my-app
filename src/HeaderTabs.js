import React from 'react'
import "./HeaderTabs.css"
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
function HeaderTabs({Icon, tabName, avatar, onClick}) {
  const user = useSelector(selectUser)
  return (
    <div className="header_tab" onClick={onClick}>
    {avatar && <Avatar className="tab_icon" >{user?(user.email[0]):null}</Avatar>}
    {Icon && <Icon className="tab_icon"/>}
    <div className="header_tab_name">{tabName}</div>
    </div>
  )
}

export default HeaderTabs