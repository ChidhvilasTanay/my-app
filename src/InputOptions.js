import React from 'react'
import "./InputOptions.css"
function InputOptions({Icon, name, color, SetFeed}) {
  return (
    <div className="input_option">
        <Icon style={color}/>
        <button  >{name}</button>
    </div>
  )
}

export default InputOptions