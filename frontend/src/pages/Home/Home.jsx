import React,{useState, useEffect} from 'react'
import Post from '../../components/post/Post'



const Home = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3000/api/post`, {
            method: 'get',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then((res) => res.json())
        .then(res => setPosts(res.posts))
    }, [])


  return (
    <div>
        {posts && posts.length > 0 && posts.map((post, i) => (
            <Post post={post}  key={i}/>
        ))}
    </div>
  )
}

export default Home