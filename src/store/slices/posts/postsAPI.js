import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async function () {
        const {data : postsData} = await axios.get('https://jsonplaceholder.typicode.com/photos?_limit=100')
        const {data : commentsData} = await axios.get('https://jsonplaceholder.typicode.com/comments')
        const data = postsData.map( post => ({
            id: post.id.toString(),
            name: post.title.slice(0, post.title.indexOf(' ')),
            postText: post.title.slice(post.title.indexOf(' ') + 1),
            likesCount: Math.round(Math.random() * 120 + 200),
            timeAgo: Math.round(Math.random() * 2 + 8) + ' Minutes Ago',
            img: post.url,
            comments: [
                ...commentsData.filter(comment => comment.postId === post.id)
                    .map(comment => ({
                        id: comment.id.toString(),
                        username: comment.name.slice(0, comment.name.indexOf(' ')),
                        body: comment.body 
                    }))
            ]
        }))
       return data
    }
)

export default fetchPosts