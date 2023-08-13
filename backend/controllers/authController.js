const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()


exports.signup = async (req, res) => {
    const {username} = req.body
    const emailExist = await User.findOne({username})
    if(emailExist){
        return res.status(400).json({
            message: 'User already exist'
        })
    }
    const user = new User(req.body)
    user.save().then(() => {
        user.hashed_password = undefined
        user.salt = undefined
        return res.status(200).json(user)
    })

    .catch((err) => {
        return res.send(err)
    })
}

exports.signin = (req, res) => {
    const {username, password} = req.body

   User.findOne({username}).then((user) => {
    if(!user.authenticate(password)){
        return res.status(401).json({
            message: 'Email and password dont match'
        })
    }

    const token = jwt.sign({_id: user.id}, process.env.JWT)
    res.cookie('token', token, {expire: new Date() + 8062000})
    const {_id, username} = user
        console.log(token)
        return res.json({
            token,
            user: {_id, username}
        })
    }).catch((err, user) => {
        console.log(err)
        if(err || !user){
            return res.status(404).json({
                message: 'User not found with this username'
            })
        }
   })
}

exports.isAuth = (req, res) => {
    const {token} = req.cookies
    
    jwt.verify(token, process.env.JWT, {}, (err, info) => {
        if(err) {
            return res.status(500).json({
                message : 'no one is connected'
            })
        }
        res.json(info);
    })
    
        
           
        
    
}

exports.signout = (req, res) => {
    res.clearCookie('token')
    return res.status(200).json({
        message: 'Logout'
    })
}