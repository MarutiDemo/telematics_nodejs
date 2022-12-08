'use strict'
const SUPPORT = require('../../helpers/support');
const ERRORCODES = require('../../helpers/errorCodes.json');
module.exports = encrypt;

async function encrypt(req, res, sendResponse) {
    let data = {};
    let message, success, errorCode = String.empty;
    let ENCRYPTnDECRYPTResponse = await SUPPORT.encryptedObject(req.body);
    if (ENCRYPTnDECRYPTResponse.encryptedStatus == true) {
        success = true, errorCode = ERRORCODES.SUCCESSCD.code, message = ERRORCODES.SUCCESSCD.message, data = ENCRYPTnDECRYPTResponse.encryptedData
    } else {
        success = false, errorCode = ERRORCODES.INPUTERROR.errorCode, message = ERRORCODES.INPUTERROR.errorMessage, data = {}
    }
    const response = {
        type: 'response', errorCode: errorCode, status: success, message: message, data: data
    }
    sendResponse(req, res, response);
}