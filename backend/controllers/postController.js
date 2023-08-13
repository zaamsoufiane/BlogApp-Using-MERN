const formidable = require('formidable');
const Post = require('../models/post');
const fs = require('fs')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.addPost = (req, res) => {
    let form = new formidable.IncomingForm();

    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {

        if(err) {
            res.status(400).json({
                error: 'Image could not uploaded !'
            })
        }

        let post = new Post(fields)

      

        if(files.photo){
           
            post.photo.data = fs.readFileSync(files.photo.filepath)
            post.photo.contentType = files.photo.mimetype
        }

        

        
 
        post.save().then(post => {
            return res.status(200).json({
                post
            })
        })
        .catch((err) => {
            return res.status(400).json({
                message: 'Post not added'
            })
        })
    })
}

exports.updatePost = (req, res) => {
    let form = new formidable.IncomingForm();

    form.keepExtensions = true;



        const isAuthor = req.post.author._id == req.auth._id
        
        if(!isAuthor){
            return res.status(400).json({
                message: 'You are not the author of this post'
            })
        }

        form.parse(req, (err, fields, files) => {

            if(err) {
                res.status(400).json({
                    error: 'Image could not uploaded !'
                })
            }
    
            let post = req.post
            post = _.extend(post, fields)
            if(files.photo){
                
                post.photo.data = fs.readFileSync(files.photo.filepath)
                post.photo.contentType = files.photo.mimetype
            }
    
          
     
            post.save().then(post => {
                return res.status(200).json({
                    post
                })
            })
            .catch((err) => {
                return res.status(400).json({
                    message: 'Post not updated'
                })
            })
        })

    }

    
    

exports.postById = (req, res, next, id) => {
    Post.findById(id).populate('author')
        .then((post) => {
            if(!post){
                return res.status(404).json({
                    message: 'Post not found'
                })
            }
            post.author.hashed_password = undefined
            post.author.salt = undefined

            req.post = post
            next()
        })
}

exports.showPost = (req, res) => {
   
    return res.json({
        post: req.post
    })
}

exports.allPosts = (req, res) => {
    Post.find()
        .select('-photo')
        .sort('-createdAt')
        .populate('author')
    .then((posts ) => {
        if(!posts) {
            return res.status(404).json({
                message: 'No posts'
            })
        }

        posts.forEach(post => {
            post.author.hashed_password = undefined
            post.author.salt = undefined
        })

    

        return res.status(200).json({
            posts
        })
    })
}

exports.postPhoto = (req, res) => {
    let post = req.post

    if(post.photo.data){
        res.set('Content-Type', post.photo.contentType)
        return res.send(post.photo.data)
    }
} 