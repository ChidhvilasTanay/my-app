import React from 'react'
import "./HeaderTabs.css"
function HeaderTabs({Icon, tabName}) {
  return (
    <div className="header_tab" >
    {Icon && <Icon className="tab_icon"/>}
    <div className="header_tab_name">{tabName}</div>
    </div>
  )
}

export default HeaderTabs