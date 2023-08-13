const express = require('express')
const mongoose = require('mongoose')
const expressValidator = require('express-validator')


const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/posts')
require('dotenv').config()
const app = express()

mongoose.connect(process.env.DATABASE)
.then(() => console.log('database connected'))
.catch((err) => console.log('database not connected !'))
const cors = require('cors')
app.use(express.json())
app.use(expressValidator())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:3001",
    credentials: true,  // Allow cookies to be sent
}))

app.use('/api', authRoutes)
app.use('/api/post', postRoutes)

const port = 3000 || 5000
app.listen(port, () => {
    console.log(`server running on port ${port}`)
})
