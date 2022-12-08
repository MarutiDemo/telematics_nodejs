'use strict';
const jwt = require('jsonwebtoken');
const ERRORCODES = require('../../helpers/errorCodes.json');
const SUPPORT = require('../../helpers/support');
require('dotenv').config();
module.exports = validateVinNumber;

async function validateVinNumber(req, res, sendResponse) {
    let data = {};
    let message, success = String.empty;
    let supportResponse = await SUPPORT.decryptedObject(req.body);
    let { decryptedStatus, decryptedData } = supportResponse;
    if (decryptedStatus == true) {
        let generateTokenResponse = await SUPPORT.generateToken();
        let { genTokenStatus, genTokenData } = generateTokenResponse;
        if (genTokenStatus == true) {
            decryptedData['token'] = genTokenData;
            success = true, message = ERRORCODES.SUCCESSCD.message, data = decryptedData
        } else {
            success = false, message = ERRORCODES.INTERNALERRCD.errorMessage, data = {}
        } 
    } else {
        success = false, message = `${ERRORCODES.INPUTERROR.errorMessage} for ${supportResponse.errorKey}`, data = {}
    }
    const response = {
        type: 'response', status: success, message: message, data: data
    }
    sendResponse(req, res, response);
}