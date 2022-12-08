'use strict';
const bodyParser = require('body-parser');
let isAuthTokenValid = false;
const validateToken = require('../config/authToken.js');
const logger = require('../config/logging.js');
const validateHeaderToken = require('../config/validateAuthToken');
const errorCodes = require('../helpers/errorCodes.json');
const telematicsRouter = require('./telematicsRouter');
let response = {};
module.exports = routes;

function routes(app) {
    app.use(bodyParser.json());
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Accept,Content-Type,Authorization,Cookie');
        res.header('Access-Control-Allow-Credentials', 'true');
        next();
    });
    app.use(async (req, res, next) => {
        console.info(req['originalUrl']);
        if (req['originalUrl'] == "/") {
            response.status = false;
            response.message = `UNAUTHORIZED`;
            res.send(response);
        } else {
            const { error } = validateToken.validate(req.headers);
            if (error) {
                response.status = false;
                response.message = `AUTHORIZATION TOKEN IS REQUIRED`;
                res.send(response);
            } else {
                isAuthTokenValid = await validateHeaderToken.validateAuthToken(req.headers);
                if (isAuthTokenValid == true) {
                    app.use('/api', telematicsRouter);
                } else {
                    response.status = false;
                    response.errorCode = errorCodes.INVALIDHEADRETOKENERR.errorCode
                    response.message = `${errorCodes.INVALIDHEADRETOKENERR.errorMessage}`;
                    res.send(response);
                }
            }
        }
        next();
    });
}