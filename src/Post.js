import React, { useEffect, useState } from 'react'
import PostOptions from './PostOptions';
import "./Post.css"
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import SendIcon from '@mui/icons-material/Send';
import Avatar from '@mui/material/Avatar';
import { forwardRef } from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import Comment from './Comment';
import { db } from './FireBase';
import firebase from 'firebase/compat/app';

const Post = forwardRef(({ name, description, postHeading, postContent, imgUrl, postIdArg}, ref)=> {
 
  const user = useSelector(selectUser)
  const [comments, setComments]=useState([]);
  const [commentInput, setCommentInput]=useState("");

  const submitComment= (event)=>{
  event.preventDefault();
  db.collection("comments").add({
    postId:postIdArg,
    name:user.displayName,
    photoUrl:user.photoUrl,
    commentContent:commentInput,
    timeStamp:firebase.firestore.FieldValue.serverTimestamp(),
  })
  }
  
 useEffect(()=>{
  db.collection("comments").where("postId","==",postIdArg).orderBy("timeStamp","desc").onSnapshot((snapshot)=>{
    setComments(snapshot.docs.map((doc)=>{
      return({
        id:doc.id,
        data:doc.data()
      })
    }))
  })
 })

  return (
    <div ref={ref} className="post">
        <div className="post_header">
          <Avatar src={imgUrl} className="post_avatar"/>
          <div className="post_info">
            <h4>{name}</h4>
            <p>{description}</p>
          </div>
        </div>
        <div className="post_body">
           <h4>{postHeading}</h4>
           <p>{postContent}</p>
        </div>
        <div className="post_options">
        <PostOptions name="Like" Icon={ThumbUpAltIcon}/>
        <PostOptions name="Comment" Icon={CommentIcon} />
        <PostOptions name="Share" Icon={ShareIcon}/>
        <PostOptions name="Send" Icon={SendIcon}/>
        </div>

        <form className="comment_input" >
          <Avatar sx={{width:28, height:28}} src={user.photoUrl} />
          <input type="text"  
          className="comment_input_text" 
          placeholder='Write a comment...' 
          value={commentInput} onChange={(event)=>{
            setCommentInput(event.target.value)
          }}/>
          <button onClick={submitComment} >Submit</button>
        </form>

        <div className="comments_section">
        {comments.map(({id, data:{name, photoUrl, commentContent}})=>{
          return(<Comment
          commentKey={id} 
          commentPhotoUrl={photoUrl} 
          commentName={name}
          commentContent={commentContent}/>)
        })}
        </div>
    </div>
  )
})

export default Post