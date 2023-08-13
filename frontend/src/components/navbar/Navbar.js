import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { isAuthenticate } from '../helpers/authenticate'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack';
import './navbar.css'

const Navbar = () => {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar();

  const signOut = (e) => {
    e.preventDefault()
    fetch(`http://localhost:3000/api/signout`,{
      method: 'post'
    })
    .then(res => res.json())
    .then(res => {
      if(res.message){
        localStorage.removeItem('token')
        enqueueSnackbar(`Logout! See You Later`, {
          variant: "success"
      })
      navigate('/')
      
  }})
    .catch(err => {
      console.log(err)
    })

  }
  return (
    <header>
        <Link to="/" className='logo'>MyBlog</Link>
        <nav>

            
            {isAuthenticate() ? 
            <>
              <NavLink to="/createpost">Create a Post</NavLink>
              <NavLink to="/signout" onClick={signOut}>Signout</NavLink>
            </> : (
            <>
              <Link to="/signin">Login</Link>
              <Link to="/signup">Register</Link>
            </>
            )}
        </nav>
    </header>
  )
}

export default Navbar