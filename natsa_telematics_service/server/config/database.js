
const logger = require('./logging')
require('dotenv').config();
const oracleDB = require('oracledb');

oracleDB.getConnection({
    user: 'muldms',
    password: 'muldms',
    connectString: "(DESCRIPTION = (ADDRESS_LIST =  (ADDRESS = (PROTOCOL = TCP)(HOST = 10.52.0.34)(PORT = 1521))) (CONNECT_DATA = (SERVICE_NAME = DMS)))"
}, (err, connection) => {
    if (err) {
        console.info("DATABASE ERROR")
        console.info(err);
    } else {
        console.info("DATABASE CONNECTED");
    }
})

