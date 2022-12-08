'use strict'
const axios = require('axios').default;
const SUPPORT = require('../../helpers/support');
const ERRORCODES = require('../../helpers/errorCodes.json');
module.exports = sendOTP;

async function sendOTP(req, res, sendResponse) {
    let data, resultObject = {};
    let message, success, errorCode = String.empty;
    let supportValidateTokenresponse = await SUPPORT.validateToken(req.body.token);
    if (supportValidateTokenresponse.status == true) {
        let supportResponse = await SUPPORT.decryptedObject(req.body);
        let { decryptedStatus, decryptedData } = supportResponse;
        if (decryptedStatus == true) {
            resultObject.phoneNumber = decryptedData.mobile;
            let supportOTPResponse = await SUPPORT.generateOTP();
            let { generateOTPStatus, generateOTPMessage, generatedOTPData } = supportOTPResponse;
            if (generateOTPStatus == true) {
                resultObject.otp = generatedOTPData
                // let sendOTPresponse = await SUPPORT.sendOTP();
                success = true, errorCode = ERRORCODES.SUCCESSCD.code, message = ERRORCODES.SUCCESSCD.message, data = resultObject
            } else {
                success = false, errorCode = ERRORCODES.INTERNALERRCD.errorCode, message = ERRORCODES.INTERNALERRCD.errorMessage, data = {}
            }
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