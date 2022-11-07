import React from 'react'
import "./Header.css"
import HeaderTabs from './HeaderTabs';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AssessmentIcon from '@mui/icons-material/Assessment';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useDispatch} from 'react-redux';
import { logout} from './features/userSlice';
import { auth } from './FireBase';
import User from './User';
function Header() {
  const dispatch = useDispatch();
  const Logout = ()=>{
    dispatch(logout())
    auth.signOut();
  }

  return (
    <div className='header'>
        <div className='header_left'>
            <LocalFireDepartmentIcon className="logo"/>
            <div className='header_search'>
              <SearchIcon/>
              <input type="text" placeholder="Search.."/>
            </div>
        </div>
        <div className='header_right'>
         <HeaderTabs Icon={HomeIcon} tabName="Home"/>
         <HeaderTabs Icon={PeopleIcon} tabName="People"/>
         <HeaderTabs Icon={NotificationsActiveIcon} tabName="Notifications"/>
         <HeaderTabs Icon={AssessmentIcon} tabName="Records"/>
         <HeaderTabs Icon={QueryStatsIcon} tabName="Statistics"/>
         <HeaderTabs Icon={EventAvailableIcon} tabName="Attendance"/>
         <User avatar={true} userName="User" onClick={Logout}/>
        </div>
    </div>
  )
}

export default Header