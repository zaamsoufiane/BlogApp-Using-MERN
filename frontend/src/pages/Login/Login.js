import React,{useState} from 'react'
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import './login.css'
const Login = () => {

    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();

    const [userInfo, setUserInfo] = useState({
        username: '',
        password: ''
    })
    const handleChange = (e) => {
        setUserInfo({...userInfo, [e.target.id]: e.target.value})
    }

    const submitUser = (e) => {
        e.preventDefault()
        fetch(`http://localhost:3000/api/signin`, {
            method: 'post',
            headers:{
                "Content-Type":'application/json',
                "Accept":"application/json"
            },
            body: JSON.stringify(userInfo)
        })
        .then(res => res.json())
        .then(res => {
            if(res.message){
                enqueueSnackbar(`${res.message.toUpperCase()} !!`, {
                    variant: "error"
                })
            } else {
                localStorage.setItem('token', JSON.stringify(res))
                enqueueSnackbar(`You're Logged In Succesfully`, {
                    variant: "success"
                })
                navigate('/')
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
  return (
    <div>
        <form className='login' action="">
            <h1>Login</h1>
            <input type="text" onChange={handleChange} id='username' placeholder='Username' />
            <input type="password" onChange={handleChange} id='password' placeholder='Password' />
            <button onClick={submitUser}>Login</button>
           
        </form>
    </div>
  )
}

export default Login