const User = require('../models/user')
const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    }
    next()
}

const userExtractor = async (request, response, next) => {
    try{
        const authorization = request.get('authorization')
        if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
            const token = authorization.substring(7)
            const decodedToken = jwt.verify(token, process.env.SECRET)
            if(!token || !decodedToken.id) {
                return response.status(401).json({
                    error: 'token missing or invalid'
                })
            }
            const user = await User.findById(decodedToken.id)
            request.user = user
        }
    } catch(exception) {
        return response.status(401).json({
            error: 'token missing or invalid'
        })
    }
    next()
}

module.exports = {tokenExtractor, userExtractor}