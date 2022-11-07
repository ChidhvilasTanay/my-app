import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectTab, tabChange } from './features/userSlice'
import "./HeaderTabs.css"
function HeaderTabs({Icon, tabName}) {

  const currentTab = useSelector(selectTab)
  const dispatch= useDispatch()

  return (
    <div className="header_tab" onClick={()=>{dispatch(tabChange(tabName))}}>
    {Icon && <Icon className="tab_icon"/>}
    <div className="header_tab_name">{tabName}</div>
    </div>
  )
}

export default HeaderTabs