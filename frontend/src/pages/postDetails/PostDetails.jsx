import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import moment from 'moment'
import './postdetails.css'


const PostDetails = () => {

    const {id} = useParams()

    const [post, setPost] = useState({})

    const userId = JSON.parse(localStorage.getItem('token')).user._id

    useEffect(() => {
        fetch(`http://localhost:3000/api/post/${id}`, {
            method: 'get',
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json"
            }
        })
        .then((res) => res.json())
        .then(res => setPost(res.post))
    }, [])

  return (
    <div className='post-page'>
        <h1>{post.title}</h1>
        <time>Shared {moment(post.createdAt).fromNow()}</time>
        <div className='creator'>By {post.author && post.author.username}</div>
        {
            (userId && post.author) && userId === post.author._id && (
                <div className='edit'>
                    <Link className="editButton" to={`/editpost/${post._id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>

                        Edit My Post
                    </Link>
                </div>
            )
        }
        <div className='photo'>
            <img src={`http://localhost:3000/api/post/photo/${id}`} alt="" />
        </div>
        <div className="content" dangerouslySetInnerHTML={{__html:post.content}} />
        
    </div>
  )
}

export default PostDetails