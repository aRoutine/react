import { useMemo, useState } from 'react'
import './styles/App.css';
import './styles/ResetStyles.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';
import MyModule from './components/UI/module/MyModule';
import MyButton from './components/UI/MyButton/MyButton';

function App() {
  const [posts, setPosts] = useState([
    {id: '1', postTitle: 'Javascript', body: 'Hello, i study js'},
    {id: '2', postTitle: 'TypeScript', body: 'Hello, i study ts'}
  ]);
  const [module, setModule] = useState(false)

  const createPost = (newPost) => {
    setPosts(newPost)
  }

  const removePost = (post) => {
  setPosts(prevPosts =>
    prevPosts.map(p =>
      p.id === post.id ? { ...p, isDeleted: true } : p
    )
  );
};


  const reOrder = (post) => {
    console.log('reOrer')
     setPosts(prev => {
      const filtered = prev.filter(p => post.id !== p.id);
      return filtered.map((p, index) => ({ ...p, id: (index+1).toString() }))
    });
    
  }

  const [filter, setFilter] = useState({query: '', selected: ''}) 

 const sortPosts = (selectedSort) => {
  setFilter({...filter, selected: selectedSort});
}

const searchQuaryEdited = (e) => {
  setFilter({...filter, query: e.target.value});
}

  const sortedPosts = useMemo(() => {
    if (filter.selected) {
    return [...posts].sort((a, b) => a[filter.selected].localeCompare(b[filter.selected]))} return posts;  
  }, [filter.selected, posts]) 

  const sortedAndSearchedPostsByTitle = useMemo(() => {
    return sortedPosts.filter(post => post.postTitle.toLowerCase().includes(filter.query.toLowerCase()))
  }, [sortedPosts, filter.query])
  

  return (
    <div className="App">
        <MyButton style={{marginTop: '30px'}} onClick={() => setModule(true)}>Get your post</MyButton>
        <MyModule setVisible={() => setModule(false)} visible={module}><PostForm setVisible={() => setModule(false)} create={createPost} posts={posts}/></MyModule>

        <hr style={{margin: '15px 0px', border: 'solid, 1px, black'}}/>
        <PostFilter onChangesortPosts={sortPosts} onChangesearchQuaryEdited={searchQuaryEdited} filter={filter} setFilter={setFilter} />
          
            {sortedAndSearchedPostsByTitle.length !== 0 
              ? 
              <PostList reOrder={reOrder} remove={removePost} posts={sortedAndSearchedPostsByTitle} title="Posts list" />
              : 
              <h1 style={{textAlign: 'center', fontSize: '24px', fontWeight: 'bold'}}>Posts not defind</h1>
            }


    </div>
  );
}

export default App
