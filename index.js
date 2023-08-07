const app = require('./app') // the actual Express application
const config = require('./utils/config')
const logger = require('./utils/logger')
const http = require('http')

const server = http.createServer(app)

//Thank you mluukkai for the help with this part c:
server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})