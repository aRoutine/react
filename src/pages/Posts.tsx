import { useEffect, useMemo, useState } from 'react'
import '../styles/App.css';
import '../styles/ResetStyles.css';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MyModule from '../components/UI/module/MyModule';
import MyButton from '../components/UI/MyButton/MyButton';
import usePosts from '../components/hooks/usePosts';
import axios from 'axios';
import PostService from '../components/API/PostService';
import Loader from '../components/UI/Loader/Loader';
import useFatching from '../components/hooks/useFatching';
import getPageCount from '../components/utils/pages';
import usePagination from '../components/hooks/usePagination';


function Posts() {
  const [posts, setPosts] = useState([]);
  const [module, setModule] = useState(false)
  const [filter, setFilter] = useState({query: '', selected: ''}) 
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0)

  const paginationList = usePagination(totalPages)
  
  const [fatchPosts, isPostsLoading, postError] = useFatching(async () => {
    const response = await PostService.getAll(limit, page) 
    setPosts(response.data)
    const totalCount = (response.headers['x-total-count'])
    setTotalPages(getPageCount(totalCount, limit))
  })
  
  const setPageClick = (page) => {
    setPage(page)
  }

  const createPost = (newPost) => {
    setPosts(newPost);
  }

  const removePost = (post) => {
  setPosts(prevPosts =>
    prevPosts.map(p =>
      p.id === post.id ? { ...p, isDeleted: true } : p
    )
  );
};

  const reOrder = (post) => {
     setPosts(prev => {
      const filtered = prev.filter(p => post.id !== p.id);
      return filtered.map((p, index) => ({ ...p, id: (index+1).toString() }))
    });
    
  }

 const sortPosts = (selectedSort) => {
  setFilter({...filter, selected: selectedSort});
}

const searchQuaryEdited = (e) => {
  setFilter({...filter, query: e.target.value});
}

        useEffect(() => { 
      fatchPosts()
        }, [page])

const sortedAndSearchedPostsByTitle = usePosts({selected: filter.selected, query: filter.query, posts})






  return (
    <div className="App">
        <MyButton style={{marginTop: '30px'}} onClick={() => setModule(true)}>Get your post</MyButton>
        <MyModule setVisible={() => setModule(false)} visible={module}><PostForm setVisible={() => setModule(false)} create={createPost} posts={posts}/></MyModule>

        <hr style={{ margin: '15px 0px', border: '1px solid black' }} />
        <PostFilter onChangesortPosts={sortPosts} onChangesearchQuaryEdited={searchQuaryEdited} filter={filter} setFilter={setFilter} />
        
        {postError &&
        <h1>ERROR: ${postError}</h1>
        }
          
              {isPostsLoading 
              ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}} ><Loader/></div>
              : <PostList 
              page={page}
              setPageClick={setPageClick} 
              paginationList={paginationList} 
              reOrder={reOrder} 
              remove={removePost} 
              posts={sortedAndSearchedPostsByTitle} 
              title="Posts list" /> 
              
              }
      
              
            


    </div>
  );
}

export default Posts;
