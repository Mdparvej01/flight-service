const {createLogger , format , transports} = require('winston');
const {combine , timestamp , label , printf} = format;

const customFormat = printf(({level,message,timestamp}) => {
    return `${timestamp} : [${label}]: ${level}:${message}`;
});

const logger = createLogger({
    format:combine(
        timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        customFormat,
        format.simple()
    ),
    transports:[
         // logs print on console awa store in log files
         new transports.Console(),
         new transports.File({filename:'combined.log'})
    ],
})
 
module.exports = logger;