'use strict'
const winston = require('winston');
const pjson = require('../../package.json');
console.log(pjson.version);
let project_name = pjson.name;
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1; // January as '0'
let yyyy = today.getFullYear();

if (dd < 10) {
    dd = '0' + dd
}

if (mm < 10) {
    mm = '0' + mm
}

let today_date = dd + '-' + mm + '-' + yyyy;
let log_file_path = './logs/' + project_name + '-' + today_date + '.log';
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: log_file_path })
    ]
});
global.logger = logger;
logger.info('WATCHING LOGS');
module.exports = logger;