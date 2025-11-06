import React, { useRef } from "react";
import PostItem from "./PostItem";
import { CSSTransition } from "react-transition-group";
import PaginationItems from "./PaginationItems";



const PostList = ({ posts, title, remove, reOrder, paginationList, setPageClick, page }) => {
  // создаём объект, в котором будут храниться ссылки для каждого поста
  const nodeRefs = useRef({});

  const setPage = (page) => setPageClick(page)

  if (!posts.length) {
        return <h1 style={{textAlign: 'center', fontSize: '24px', fontWeight: 'bold'}}>Posts not defind</h1>
      } 

  return (
    <div>


      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "24px",
        }}
      >
        {title}
      </h2>

     
        {posts.map((post) => {
          // создаём ref для каждого поста, если его нет
          if (!nodeRefs.current[post.id]) {
            nodeRefs.current[post.id] = React.createRef();
          }

          return (
            <CSSTransition
              key={post.id}
              nodeRef={nodeRefs.current[post.id]}
              timeout={500}
              classNames="item"
              in={!post.isDeleted}         // вот ключевой момент!
              onExited={() => reOrder(post)} // когда анимация закончилась
              unmountOnExit
            >
              <div ref={nodeRefs.current[post.id]}>
                <PostItem remove={remove} post={post} />
              </div>
            </CSSTransition>
          );
        })}
      <PaginationItems onPage={page} paginationList={paginationList} setPage={() => setPage}></PaginationItems>
    </div>
  );
};

export default PostList;
