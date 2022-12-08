'use strict'

const SUPPORT = require('../../helpers/support');
const ERRORCODES = require('../../helpers/errorCodes.json');
module.exports = refreshToken;

async function refreshToken(req, res, sendResponse) {
    let data = {};
    let message, success, errorCode = String.empty;
    let supportResponse = await SUPPORT.decryptedObject(req.body);
    if (supportResponse.decryptedStatus == true) {
        let supportValidateTokenresponse = await SUPPORT.generateToken();
        if (supportValidateTokenresponse.genTokenStatus == true) {
            supportResponse.decryptedData['token'] = supportValidateTokenresponse.genTokenData;
            success = true, errorCode = ERRORCODES.SUCCESSCD.code, message = ERRORCODES.SUCCESSCD.message, data = supportResponse.decryptedData
        } else {
            success = false, errorCode = ERRORCODES.INPUTERROR.errorCode, message = ERRORCODES.INPUTERROR.errorMessage, data = {}
        }
    } else {
        success = false, errorCode = ERRORCODES.INPUTERROR.errorCode, message = ERRORCODES.INPUTERROR.errorMessage, data = {}
    }
    const response = {
        type: 'response', errorCode: errorCode, status: success, message: message, data: data
    }
    sendResponse(req, res, response);
}