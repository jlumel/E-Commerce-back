const log4js = require('log4js')

log4js.configure({
    appenders: {
        error: {type: 'file', filename: './src/logs/error.log'},
        logger: {type: 'console'}
    },
    categories: {
        default: {appenders: ['logger'], level: 'info'},
        error: {appenders: ['error', 'logger'], level: 'error'}
    }
})

exports.logger = log4js.getLogger()
exports.errorLog = log4js.getLogger('error')