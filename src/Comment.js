import React from 'react'
import "./Comment.css"
import Avatar from '@mui/material/Avatar';

function Comment({commentPhotoUrl, commentName, commentContent}) {
  return (
    <div className="comment">
    <Avatar src={commentPhotoUrl} sx={{height:24,width:24}}/>
        <div className="comment_name_content">
            <h4>{commentName}</h4>
            <p>{commentContent}</p>
        </div>
    </div>
  )
}

export default Comment