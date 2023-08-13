import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { SnackbarProvider, useSnackbar } from 'notistack';

import './createpost.css'

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
      ]
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

const CreatePost = () => {

  const userId = JSON.parse(localStorage.getItem('token')).user._id

  const { enqueueSnackbar } = useSnackbar();
  const [post, setPost] = useState({
      title: '',
      summary:'',
      content:'',
      photo:'',
      author: userId
  })

  const [formData, setFormData] = useState(new FormData())
  

    
const handleChange = (e) => {

  const value = e.target.id === "photo" ? e.target.files[0] : e.target.value
  
  
  
  setPost({...post, [e.target.id]: value})
 
}



const submitPost = (e) => {

  formData.set('title', post.title)
  formData.set('summary', post.summary)
  formData.set('content', post.content)
  formData.set('photo', post.photo)
  formData.set('author', post.author)
    e.preventDefault()

    
    console.log(formData)
    fetch(`http://localhost:3000/api/post`,{
      method: 'post',
      headers: {
        "Accept":"application/json"
      },
      body: formData
      
    })
    .then((res) => res.json())
    .then(res => {
      if(res.message){

        enqueueSnackbar(`${res.message.toUpperCase()} !!`, {
            variant: "error"
        })
    } else {
        enqueueSnackbar(`Post Added Succesfully`, {
            variant: "success"
        })
   
        
        setPost({
          title: '',
          summary:'',
          content:'',
          photo:''
        })
        setFormData(new FormData())
      }
    })
    .catch(err => {
      console.log(err)
    })
}



  return (
    <form onSubmit={submitPost}>
        <input onChange={handleChange} value={post.title} type="text" id='title' placeholder='Title' />
        <input onChange={handleChange} value={post.summary} type="text" id='summary' placeholder='Summary' />
        <input type="file" onChange={handleChange} name="" id="photo" />
        <ReactQuill id='content' value={post.content} onChange={(newcontent) => setPost({...post, content: newcontent})} theme='snow' modules={modules} formats={formats}/>
        <button style={{marginTop: '8px'}}>Submit post</button>
        
    </form>
  )
}

export default CreatePost