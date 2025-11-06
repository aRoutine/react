import React, { useMemo } from "react";

const usePosts = ({selected, query, posts}) => {

const sortedPosts = useMemo(() => {
    if (!posts) return [];

    if (selected) {
    return [...posts].sort((a, b) => (a[selected] ?? '').localeCompare((b[selected]) ?? ''))}
    return posts; // если сортировки нет — просто возвращаем исходный массив 
  }, [selected, posts]) 
  
 
    const sortedAndSearchedPostsByTitle = useMemo(() => {
    return sortedPosts.filter(post => (post.postTitle || '')
    .toLowerCase()
    .includes(query.toLowerCase()))
  }, [sortedPosts, query])
  return sortedAndSearchedPostsByTitle

}

export default usePosts;