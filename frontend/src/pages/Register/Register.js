import React, { useState } from 'react'
import { SnackbarProvider, useSnackbar } from 'notistack';
import './register.css'
const Register = () => {

    const { enqueueSnackbar } = useSnackbar();

    const [userInfo, setUserInfo] = useState({
        username: '',
        password:''
    })

    const handleChange = e => {
        setUserInfo({...userInfo, [e.target.id]: e.target.value})
    }

    const submitUser = (e) => {
        e.preventDefault()
        fetch(`http://localhost:3000/api/signup`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
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
                enqueueSnackbar(`${userInfo.username.toUpperCase()} Has Been Added`, {
                    variant: "success"
                })
            }

        })
        .catch(err => {
            console.log(err)
        })
    }
  return (
    <div>
        <form className='register' action="">
            <h1>Register</h1>
            <input onChange={handleChange} type="text" id="username" placeholder='Username' />
            <input onChange={handleChange} type="password" id="password" placeholder='Password' />
            <button onClick={submitUser}>Register</button>
           
        </form>
    </div>
  )
}

export default Register