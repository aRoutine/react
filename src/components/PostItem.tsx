import React from "react";

const PostItem = ({post, remove}) => {
    
    

    return(
        
            <div className="post">
            <div className="post-content">
                <strong>{post.id}. {post.postTitle}</strong>
                <div>{post.body}</div>
            </div>
            <button onClick={() => {remove(post)}} className='post-btn'>Delete</button>
            </div>

    )
}
export default PostItem;