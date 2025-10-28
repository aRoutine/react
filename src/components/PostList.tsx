import React, { useRef } from "react";
import PostItem from "./PostItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const PostList = ({ posts, title, remove, reOrder }) => {
  // создаём объект, в котором будут храниться ссылки для каждого поста
  const nodeRefs = useRef({});

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "24px",
        }}
      >
        {title}
      </h1>

     
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
     
    </div>
  );
};

export default PostList;
