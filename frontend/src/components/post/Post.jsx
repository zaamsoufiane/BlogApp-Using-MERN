import React from 'react'
import './post.css'
import moment from 'moment'
import { Link } from 'react-router-dom'
const Post = ({post}) => {

 
  return (
    <>
        <div className='post'>
            <Link to={`/post/${post._id}`} className='image'>
                <img src={`http://localhost:3000/api/post/photo/${post._id}`} alt="" />
            </Link>
            <div className='texts'>
                <Link to={`/post/${post._id}`} className='titlePost'>
                    <h2>{post.title}</h2>
                </Link>
                <p className="more-info">
                    <Link className="creator">By {post.author.username}</Link>
                    <time>Shared {moment(post.createdAt).fromNow()}</time>
                </p>
                <p className='content'>{post.summary}</p>
            </div>
        </div>
        
        
    </>
  )
}

export default Post