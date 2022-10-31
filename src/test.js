import React, {useState, useEffect} from 'react'
import "./Feedbar.css"
import CreateIcon from '@mui/icons-material/Create';
import FeedIcon from '@mui/icons-material/Feed';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import EventNoteIcon from '@mui/icons-material/EventNote';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import InputOptions from './InputOptions';
import Post from './Post';
import {db} from "./FireBase"
import firebase from "firebase"
function Feedbar() {
    const [posts, setPosts]=useState([]);
    const [input, setInput]=useState('');
    
    const submitPost = (event) =>{
    event.preventDefault();
    db.collections("posts").add({
        name:"tanay",
        description:"testing",
        postHeading:"Heading",
        postContent:input,
        timeStamp:firebase.firestore.FieldValue.serverTimestamp()
    })
    }
    
    useEffect(()=>{
    db.collections("posts").onSnapshot((snapshot)=>{
        setPosts(snapshot.docs.map((doc)=>{
           return( {
            id:doc.id,
            data:doc.data,
            })
        }))
    })
    }, [])
  
    return (
    <div className="feedbar">
        <div className="input_container">
            <div className="feed_input">
                <CreateIcon className="create_icon"/>
                <form>
                <input type="text" 
                className="input_text" 
                placeholder="Enter Text here.." 
                value={input}
                onChange={(event)=>{
                    setInput(event.target.value)
                }}/>
                <button className="submit_button" onClick={submitPost}>Submit</button>
                </form>
            </div>
            <div className="feed_input_options">
                <InputOptions Icon={FeedIcon} name="Article"/>
                <InputOptions Icon={AnnouncementIcon} name="Announcements"/>
                <InputOptions Icon={EventNoteIcon} name="Events"/>
                <InputOptions Icon={UpcomingIcon} name="Submissions"/>
            </div>
        </div>
        <div className="post_section">
        {posts.map(({id, data:{name, description, postHeading, postContent}}) => {
        return(
        <Post
        key={id} 
        name={name}
        description={description}
        postHeading={postHeading}
        postContent={postContent}/>
        )
        })}
        </div>
    </div>
  )
}

export default Feedbar