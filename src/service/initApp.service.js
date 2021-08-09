import { logger, errorLog } from './logger.service.js'
import { mongoDB } from '../DB/initDataBase'
import config from '../config/config'

const initApp = (app) => {

    logger.info('Connecting to Database')

    mongoDB
        .then(() => {
            logger.info('Database Connected')
            logger.info('Initializing Server...')
            const server = app.listen(config.PORT, () => {
                logger.info(`Server up at PORT ${config.PORT}`)
            })

            server.on('error', error => {
                errorLog.error(error)
            })
        })
        .catch(err => errorLog.error(err))
}


module.exports = initApp