import React, { useEffect, useMemo } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import IMAGES from '../../images'
import fetchPosts from '../../store/slices/posts/postsAPI'
import { selectPosts } from '../../store/slices/posts/postsSlice'
import { resetSearch, selectSearch } from '../../store/slices/search/searchSlice'
import Post from '../Post/Post'


function Posts() {

    const dispatch = useDispatch()
    const posts = useSelector(selectPosts)
    const search = useSelector(selectSearch)

   useEffect(() =>{
    if(!posts.length){
      dispatch(fetchPosts())
    }
   }, [])

   useEffect(() => {
     return () => {
      dispatch(resetSearch())
     }
   }, [])

   const filteredPosts = useMemo(() => {
    let initialPosts = [...posts.filter(post => post.name.includes(search.toLowerCase()))]
     return [
        ...initialPosts.filter(post => post.name.startsWith(search)),
        ...initialPosts.filter(post => !post.name.startsWith(search))
     ]
   }, [posts, search])
  return (
    <>
        {
            filteredPosts.map(el => <Post key={el.id} id={el.id} img={el.img} name={el.name} likesCount={el.likesCount} postText={el.postText} timeAgo={el.timeAgo} comments={el.comments} />)
        }
    </>
  )
}

export default Posts