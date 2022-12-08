'use strict'
const SUPPORT = require('../../helpers/support');
const ERRORCODES = require('../../helpers/errorCodes.json');
module.exports = validateOTP;

async function validateOTP(req, res, sendResponse) {
    let data = {};
    let message, success, errorCode = String.empty;
    let supportValidateTokenresponse = await SUPPORT.validateToken(req.body.token);
    if (supportValidateTokenresponse.status == true) {
        let supportResponse = await SUPPORT.decryptedObject(req.body);
        let { decryptedStatus, decryptedData } = supportResponse;
        if (decryptedStatus == true) {
            success = true, errorCode = ERRORCODES.SUCCESSCD.code, message = ERRORCODES.SUCCESSCD.message, data = decryptedData
        } else {
            success = false, errorCode = ERRORCODES.SUCCESSCD.code, message = ERRORCODES.INPUTERROR.errorMessage, data = {}
        }
    } else {
        success = false, errorCode = ERRORCODES.TOKENEXPIREDERRORCD.errorCode, message = ERRORCODES.TOKENEXPIREDERRORCD.errorMessage, data = {}
    }
    const response = {
        type: 'response', errorCode: errorCode, status: success, message: message, data: data
    }
    sendResponse(req, res, response);
}