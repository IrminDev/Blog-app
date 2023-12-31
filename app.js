const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
require('express-async-errors')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const testingRouter = require('./controllers/test')
require('dotenv').config()

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI)
.then(() => {
    logger.info('connected to MongoDB')
}).catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
})

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use(express.static('build'))
app.use('/api/blogs', middleware.userExtractor, blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
console.log('process.env.NODE_ENV', process.env.NODE_ENV, '1')
if (process.env.NODE_ENV === 'test ') {
    console.log('testingRouter')
    app.use('/api/testing', testingRouter)
}

module.exports = app