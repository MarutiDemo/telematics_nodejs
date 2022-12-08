const express = require('express');
const helmet = require('helmet');
const app = express();
const fs = require('fs');
require('dotenv').config();

/*== USING HELMET PACKAGE TO SECURE THE HTTP HEADERS ==X*/
app.use(helmet());

const port = process.env.PORT;
global.Env = process.env.NODE_ENV;
const logger = require('./server/config/logging')
// require('./server/config/database');
require('./server/config/databaseConnection');
require('./server/routes/index')(app);
app.listen(port, () => {
    console.info("=============== NODE SERVER STARTED ===============");
    console.info(`SERVER RUNNING ON PORT ${port}`);
});
module.exports = app;