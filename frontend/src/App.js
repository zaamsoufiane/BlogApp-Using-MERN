import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Post from './components/post/Post';
import Layout from './components/navbar/Layout';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CreatePost from './pages/post/CreatePost';
import Home from './pages/Home/Home';
import PostDetails from './pages/postDetails/PostDetails';
import EditPost from './pages/EditPost/EditPost';
function App() {
  return (
    
      
      <div className='main'>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}/>
            <Route path="/signin" element={<Login />}/>
            <Route path="/signup" element={<Register />}/>
            <Route path="/createpost" element={<CreatePost />}/>
            <Route path="/post/:id" element={<PostDetails />}/>
            <Route path="/editpost/:id" element={<EditPost />}/>
          </Route>
        </Routes>
      </div>
    
  );
}

export default App;
