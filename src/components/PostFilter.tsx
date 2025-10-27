import { useState } from "react";
import MyInput from "./UI/MyInput/MyInput";
import MySelect from "./UI/select/MySelect";

const PostFilter = ({filter, setFilter, onChangesearchQuaryEdited, onChangesortPosts}) => {
   
    const [options, setOptions] = useState([
        {value: 'postTitle', name: 'по названию'},
        {value: 'body', name: 'по описанию'}
      ])

    return (
         <div>
            <MyInput onChange={onChangesearchQuaryEdited} type="text" placeholder='Post searching by title' value={filter.query}/>
            <MySelect 
              value={filter.selected} 
              onChange={onChangesortPosts} 
              options={options} 
              defaultValue='сортировка'>
            </MySelect>
        </div>
    )
}


export default PostFilter;