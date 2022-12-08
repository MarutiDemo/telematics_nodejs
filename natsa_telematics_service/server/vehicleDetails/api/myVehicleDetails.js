'use strict'
const SUPPORT = require('../../helpers/support');
const ERRORCODES = require('../../helpers/errorCodes.json');
const STORED_PROCEDURES = require('../../helpers/storedProcedures.json');

module.exports = myVehicleDetails;

async function myVehicleDetails(req, res, sendResponse) {
    let data = {};
    let message, success, errorCode = String.empty;
    let supportValidateTokenresponse = await SUPPORT.validateToken(req.body.token);
    if (supportValidateTokenresponse.status == true) {
        let supportResponse = await SUPPORT.decryptedObject(req.body);
        let { decryptedStatus, decryptedData } = supportResponse;
        if (decryptedStatus == true) {
            const result = await DBConnection.query(`${STORED_PROCEDURES.getVehicleDetails}(2)`);
            if (result) {
                success = false, errorCode = ERRORCODES.SUCCESSCD.errorCode, message = ERRORCODES.SUCCESSCD.errorMessage, data = result
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