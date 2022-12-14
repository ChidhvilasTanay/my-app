import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { feedChange, selectFeed } from './features/userSlice';
import "./InputOptions.css"
function InputOptions({Icon, name, color }) {
  const feedTab = useSelector(selectFeed) 
  const dispatch=useDispatch();
 
  return (
    <div className="input_option" value={name} onClick={()=>{dispatch(feedChange(name))}}>
        <Icon style={color}/>
        <input type="button" value={name} className="input_button" />
    </div>
  )
}

export default InputOptions 