'use strict'
const ERRORCODES = require('../../helpers/errorCodes.json');
const SUPPORT = require('../../helpers/support');

module.exports = validatePhoneAndVinNo;

async function validatePhoneAndVinNo(req, res, sendResponse) {
    let data = {};
    let message, success, errorCode = String.empty;
    let validateTokenResponse = await SUPPORT.validateToken(req.body.token);
    if (validateTokenResponse.status == true) {
        let supportResponse = await SUPPORT.decryptedObject(req.body);
        let { decryptedStatus, decryptedData } = supportResponse;
        if (decryptedStatus == true) {
            success = true, errorCode = ERRORCODES.SUCCESSCD.code, message = ERRORCODES.SUCCESSCD.message, data = decryptedData;
        } else {
            success = false, errorCode = ERRORCODES.INPUTERROR.errorCode, message = ERRORCODES.INPUTERROR.errorMessage, data = {}
        }
    } else {
        success = false, errorCode = ERRORCODES.TOKENEXPIREDERRORCD.errorCode, message = ERRORCODES.TOKENEXPIREDERRORCD.errorMessage, data = {}
    }
    const response = {
        type: 'response', errorCode: errorCode, status: success, message: message, data: data
    }
    sendResponse(req, res, response);
}