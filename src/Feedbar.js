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
import { selectFeed, selectPrev, selectUser } from './features/userSlice';
import FlipMove from "react-flip-move";

function Feedbar() {
   const [posts, setPosts]=useState([]);
   const [articleIntro, setArticleIntro]=useState("");
   const [articleInput, setArticleInput]=useState("");
   const [announcementInput, setAnnouncementInput]=useState('');
   const [eventInput, setEventInput]=useState('');
   const [submissionInput, setSubmissionInput]=useState('');

   const user = useSelector(selectUser)
   const feedTab = useSelector(selectFeed)
   const prev = useSelector(selectPrev);
   const submitArticle = (event) =>{
    event.preventDefault();
    db.collection("posts").add({
        name:user.displayName,
        description:user.email,
        postHeading:prev,
        intro:articleIntro,
        postContent:articleInput,
        photoUrl:user.photoUrl,
        feedType:feedTab,
        timeStamp:firebase.firestore.FieldValue.serverTimestamp()
    })
    }

       const submitAnnouncement = (event) =>{
    event.preventDefault();
    db.collection("posts").add({
        name:user.displayName,
        description:user.email,
        postHeading:prev,
        postContent:announcementInput,
        photoUrl:user.photoUrl,
        feedType:feedTab,
        timeStamp:firebase.firestore.FieldValue.serverTimestamp()
    })
    }

       const submitEvent = (event) =>{
    event.preventDefault();
    db.collection("posts").add({
        name:user.displayName,
        description:user.email,
        postHeading:prev,
        postContent:eventInput,
        photoUrl:user.photoUrl,
        feedType:feedTab,
        timeStamp:firebase.firestore.FieldValue.serverTimestamp()
    })
    }

       const submitSubmission = (event) =>{
    event.preventDefault();
    db.collection("posts").add({
        name:user.displayName,
        description:user.email,
        postHeading:prev,
        postContent:submissionInput,
        photoUrl:user.photoUrl,
        feedType:feedTab,
        timeStamp:firebase.firestore.FieldValue.serverTimestamp()
    })
    }

     useEffect(()=>{
    db.collection("posts").where("feedType","==",feedTab).orderBy("timeStamp","desc").onSnapshot((snapshot)=>{
        setPosts(snapshot.docs.map((doc)=>{
           return( {
            id:doc.id,
            data:doc.data(),
            })
        }))
    })
    },[feedTab]);

const RenderInput = ()=>{
    switch(feedTab){
        case "Articles":return(
             <div className="feed_input_articles">
                <CreateIcon className="create_icon"/>
                <form>
                 <input type="text" 
                className="article_intro_text" 
                placeholder="Introduction.." 
                value={articleIntro}
                onChange={(event)=>{
                    setArticleIntro(event.target.value)
                }}/>
                 <input type="text" 
                className="input_text" 
                placeholder="Enter Text here.." 
                value={articleInput}
                onChange={(event)=>{
                    setArticleInput(event.target.value)
                }}/>
                <button className="submit_button" onClick={submitArticle}>Submit</button>
                </form>
            </div>
        )
        case "Announcements":return(
             <div className="feed_input_announcements">
                <CreateIcon className="create_icon"/>
                <form>
                 <input type="text" 
                className="input_text" 
                placeholder="Enter Text here.." 
                value={announcementInput}
                onChange={(event)=>{
                    setAnnouncementInput(event.target.value)
                }}/>
                <button className="submit_button" onClick={submitAnnouncement}>Submit</button>
                </form>
            </div>
        )
        case "Events":return(
             <div className="feed_input_events">
                <CreateIcon className="create_icon"/>
                <form>
                 <input type="text" 
                className="input_text" 
                placeholder="Enter Text here.." 
                value={eventInput}
                onChange={(event)=>{
                    setEventInput(event.target.value)
                }}/>
                <button className="submit_button" onClick={submitEvent}>Submit</button>
                </form>
            </div>
        )
        case "Submissions":return(
             <div className="feed_input_submissions">
                <CreateIcon className="create_icon"/>
                <form>
                 <input type="text" 
                className="input_text" 
                placeholder="Enter Text here.." 
                value={submissionInput}
                onChange={(event)=>{
                    setSubmissionInput(event.target.value)
                }}/>
                <button className="submit_button" onClick={submitSubmission}>Submit</button>
                </form>
            </div>
        )
    }
}




    
  return (
    <div className="feedbar">
        <div className="input_container">
           {RenderInput()}
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
        <p className='feed_heading'>{feedTab}</p>
        <div className="post_section">
        <FlipMove>
          {posts.map(({id, data}) => {
        return(
        <Post
        key={id}
        postIdArg={id}
        name={data.name}
        description={data.description}
        intro ={data.intro}
        postHeading={data.postHeading}
        postContent={data.postContent}
        imgUrl={data.photoUrl}/>
        )
        })}
        </FlipMove>
        </div>
    </div>
  )
}

export default Feedbar