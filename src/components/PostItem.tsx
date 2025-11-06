import React from "react";
import { useNavigate } from "react-router-dom";

const PostItem = ({post, remove}) => {
    
    const router = useNavigate();
    

    return(
        
            <div className="post">
            <div className="post-content">
                <strong>{post.id}. {post.title}</strong>
                <div>{post.body}</div>
            </div>
            <div className="post__btn">
                <button onClick={() => {remove(post)}} className='post-btn'>Delete</button>
                <button onClick={() => {router(`/posts/${post.id}`)}} className='post-btn'>Open</button>
            </div>
            
            </div>

    )
}
export default PostItem;