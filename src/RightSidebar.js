import React from 'react'
import "./RightSidebar.css"
function RightSidebar() {
     function UpdateRender(item){
  return(
  <p className="update_item">#{item}</p>
  )
  }
  return (
    <div className="right_sidebar">
        <div className="updates_section">
           <h3>Updates</h3>
           <br></br>
           {UpdateRender("CONVOCATION 2022")}
           {UpdateRender("AURORA 2023")}
           {UpdateRender("INFOTSAV 2024")}
        </div>
    </div>
  )
}

export default RightSidebar