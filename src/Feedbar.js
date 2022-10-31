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
import firebase from 'firebase/compat/app';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import FlipMove from "react-flip-move";

function Feedbar() {
   const [posts, setPosts]=useState([]);
   const [input, setInput]=useState('');
   const [feedTab, setFeedTab]=useState("");

   const user = useSelector(selectUser)
   
   const submitPost = (event) =>{
    event.preventDefault();
    db.collection("posts").add({
        name:user.displayName,
        description:user.email,
        postHeading:"Heading",
        postContent:input,
        photoUrl:user.photoUrl,
        feedType:feedTab,
        timeStamp:firebase.firestore.FieldValue.serverTimestamp()
    })
    }

     useEffect(()=>{
    db.collection("posts").orderBy("timeStamp","desc").onSnapshot((snapshot)=>{
        setPosts(snapshot.docs.map((doc)=>{
           return( {
            id:doc.id,
            data:doc.data(),
            })
        }))
    })
    },[]);

    // const SetFeed=(event)=>{
    //     setFeedTab(event.target.value)
    // }
    
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
                <InputOptions Icon={FeedIcon} 
                name="Articles" />
                
                <InputOptions Icon={AnnouncementIcon} 
                name="Announcements"/>

                <InputOptions Icon={EventNoteIcon} 
                name="Events"/>

                <InputOptions Icon={UpcomingIcon} 
                name="Submissions"/>

            </div>
        </div>
        <div className="post_section">
        <FlipMove>
          {posts.map(({id, data:{name, description, postHeading, postContent, photoUrl}}) => {
        return(
        <Post
        postIdArg={id}
        name={name}
        description={description}
        postHeading={postHeading}
        postContent={postContent}
        imgUrl={photoUrl}/>
        )
        })}
        </FlipMove>
        </div>
    </div>
  )
}

export default Feedbar