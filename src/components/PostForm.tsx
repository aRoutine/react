import React, { useState } from "react";
import MyButton from "./UI/MyButton/MyButton";
import MyInput from "./UI/MyInput/MyInput";

const PostForm = ({posts, create, setVisible}) => {

    const [title, setTitle] = useState('')

  const titleF = (e: React.ChangeEvent<HTMLInputElement>) => {

    setTitle(e.target.value)
  }

  const [body, setBody] = useState('')

  const bodyF = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    setBody(e.target.value)
  }

  const addPost = (e) => {
    setVisible()

    e.preventDefault() 

    const newPost = {id: posts.length + 1, postTitle: title, body: body}
    
    create([...posts, newPost]);

    setTitle('')
    setBody('')

  }

    return(
        <form>
              <MyInput onChange={titleF} type="text" placeholder='Title post' value={title} />
                <MyInput onChange={bodyF} type="text" placeholder='Post body' value={body} />
                  <MyButton onClick={addPost}>Get post</MyButton>
         </form>
    )
}

export default PostForm;