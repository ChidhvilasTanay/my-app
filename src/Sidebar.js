import React from 'react'
import "./Sidebar.css"
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
function Sidebar() {

  const user = useSelector(selectUser);

  function RecentRender(item){
  return(
  <p className="recent_item">#{item}</p>
  )
  }
  return (
    <div className="sidebar">
      <div className="sidebar_info">
        <img src="http://placekitten.com/200/100"/>
        <Avatar src={user.photoUrl}></Avatar>
        <h3>{user.displayName}</h3>
        <p>USER BIO</p>
      </div>
      <div className="sidebar_views">
        <div className="view_count_box">
          <p>account viewers</p>
          <p>9999</p>
        </div>
        <div className="view_count_box">
          <p>post viewers</p>
          <p>9999</p>
        </div>
      </div>
      <div className="recent_section">
         <h3>Recent</h3>
         {RecentRender("Design and Analysis of Algorithms")}
         {RecentRender("Computer Organization and Architecture")}
         {RecentRender("Computer Networks")}
      </div>
    </div>
  )
}

export default Sidebar