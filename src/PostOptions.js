import React from 'react'
import "./PostOptions.css"
function PostOptions({Icon, name, color }) {
  return (
    <div className="post_option">
        <Icon style={color}/>
        <input type="button" value={name} className="post_button" />
    </div>
  )
}

export default PostOptions