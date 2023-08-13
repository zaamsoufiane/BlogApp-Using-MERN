import React,{useState, useEffect} from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { SnackbarProvider, useSnackbar } from 'notistack';

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

const EditPost = () => {

    const navigate = useNavigate()

    const { enqueueSnackbar } = useSnackbar();

    const {id} = useParams()
    const userId = JSON.parse(localStorage.getItem('token')).user._id
    const token = JSON.parse(localStorage.getItem('token')).token

    const [post, setPost] = useState({
        title: '',
        summary:'',
        content:'',
        photo:'',
        author: userId
    })


    const [isLoading, setIsLoading] = useState(true)
    
    
    const [formData, setFormData] = useState(new FormData())

    const handleChange = e => {
        const value = e.target.id === "photo" ? e.target.files[0] : e.target.value
        setPost({...post, [e.target.id]: value})
    }

    useEffect(() => {
        fetch(`http://localhost:3000/api/post/${id}`, {
            method: 'get',
            headers:{
                "Accept":"application/json",
                'Content-Type':'application/json',
                
            },
            credentials: "include"
        })
        .then(res => res.json())
        .then(res => {
            

            const arrayBuffer = new Uint8Array(res.post.photo.data.data).buffer;
            const blob = new Blob([arrayBuffer], { type: res.post.photo.contentType });
            const photoUrl = URL.createObjectURL(blob);
            console.log(photoUrl)

            

            setPost({...post, title: res.post.title, summary: res.post.summary, content: res.post.content, photo: photoUrl})
            setIsLoading(false)
           
        })

    }, [])

        
    const updatePost = e => {
        formData.set('title', post.title)
        formData.set('summary', post.summary)
        formData.set('content', post.content)
        if (post.photo instanceof File) {
            formData.set('photo', post.photo);
          }
     
        formData.set('author', post.author)
        
        e.preventDefault()

        fetch(`http://localhost:3000/api/post/${id}`,{
            method: 'put',
            headers: {
              
              
              'Authorization': `Bearer ${token}`
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
                    enqueueSnackbar(`Post Updated Succesfully`, {
                        variant: "success"
                    })
           
               
                setPost({
                title: '',
                summary:'',
                content:'',
                photo:''
                })
                setFormData(new FormData())
                navigate(`/post/${id}`)
            }
            })
            .catch(err => {
            console.log(err)
            })
    }
  return (
    <>
    {!isLoading && (
    <form onSubmit={updatePost}>
        <input onChange={handleChange} value={post.title} type="text" id='title' placeholder='Title' />
        <input onChange={handleChange} value={post.summary} type="text" id='summary' placeholder='Summary' />
        <input type="file" onChange={handleChange} name="" id="photo" />
        <ReactQuill id='content' value={post.content} onChange={(newcontent) => setPost({...post, content: newcontent})} theme='snow' modules={modules} formats={formats}/>
        <button style={{marginTop: '8px'}}>Update post</button>

        <img src={post.photo} alt="" />
        
    </form>
    )}
    </>
  )
}

export default EditPost