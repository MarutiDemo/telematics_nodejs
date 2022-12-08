'use strict'
const SUPPORT = require('../../helpers/support');
const ERRORCODES = require('../../helpers/errorCodes.json');

module.exports = resendOTP;

async function resendOTP(req, res, sendResponse) {
    let data, resultObject = {};
    let message, success, errCode = String.empty;
    let supportValidateTokenresponse = await SUPPORT.validateToken(req.body.token);
    if (supportValidateTokenresponse.status == true) {
        let supportResponse = await SUPPORT.decryptedObject(req.body);
        let { decryptedStatus, decryptedData } = supportResponse;
        if (decryptedStatus == true) {
            resultObject.userDetails = decryptedData;
            let supportOTPResponse = await SUPPORT.generateOTP();
            let { generateOTPStatus, generateOTPMessage, generatedOTPData } = supportOTPResponse;
            if (generateOTPStatus == true) {
                resultObject.otp = generatedOTPData
                success = true, errCode = ERRORCODES.SUCCESSCD.code, message = ERRORCODES.SUCCESSCD.message, data = resultObject
            } else {
                success = false, errCode = ERRORCODES.INTERNALERRCD.errorCode, message = ERRORCODES.INTERNALERRCD.errorMessage, data = {}
            }
        } else {
            success = false, errCode = ERRORCODES.INPUTERROR.errorCode, message = ERRORCODES.INPUTERROR.errorMessage, data = {}
        }
    } else {
        success = false, errCode = ERRORCODES.TOKENEXPIREDERRORCD.errorCode, message = ERRORCODES.TOKENEXPIREDERRORCD.errorMessage, data = {}
    }
    const response = {
        type: 'response', status: success, errorCode: errCode, message: message, data: data
    }
    sendResponse(req, res, response);
}