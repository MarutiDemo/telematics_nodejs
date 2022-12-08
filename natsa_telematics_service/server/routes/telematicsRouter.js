const express = require('express');
const router = express.Router();
const Joi = require('joi')
let sendResponse = require('../helpers/sendResponse');
const errorCodes = require('../helpers/errorCodes.json');
let vinNoValidationSchema = require('../Login/schema/vinNoSchema');
let authenticatePhoneAndVin = require('../Login/schema/phoneAuthSchema');
let sendOTPSchema = require('../OTP/schema/sendOTPSchema');
let validateOTPSchema = require('../OTP/schema/validateSchema');
let resendOTPSchema = require('../OTP/schema/resendOTPSchema');
let secondaryUserSchema = require('../user/schema/addSecondaryUserSchema');
let saveSecondaryuserSchema = require('../user/schema/saveSecondaryUserSchema');
let refreshTokenSchema = require('../token/schema/refreshTokenSchema');
let saveOrUpdatePrimaryUserSchema = require('../user/schema/addPrimaryuserDetailsSchema');
let getVehicleDetailsSchema = require('../vehicleDetails/schema/getMyVehicleSchema');
let addVehicleSchema = require('../vehicleDetails/schema/addVehicleSchema');
let encrpytStringSchema = require('../generateAES/schema/convertSchema');
let errorCode, message = String.empty;
router
    .post(['/VinNoValidation'], (req, res) => {
        const { error } = vinNoValidationSchema.validate(req.body);
        if (error) {
            const response = {
                type: 'response',
                status: false,
                errorCode: errorCodes.VINNOERRORCD.errorCode,
                message: errorCodes.VINNOERRORCD.errorMessage
            }
            sendResponse(req, res, response);
        } else {
            require('../Login/api/vehicleNumberValidation.js')(req, res, sendResponse);
        }
    })
    .post(['/Authentication'], (req, res) => {
        const { error } = authenticatePhoneAndVin.validate(req.body);
        if (error) {
            if (error.details[0].context['key'] == "phoneNo") {
                errorCode = errorCodes.PHONENOERRORCD.errorCode, message = errorCodes.PHONENOERRORCD.errorMessage;
            } else if (error.details[0].context['key'] == "vinNo") {
                errorCode = errorCodes.VINNOERRORCD.errorCode, message = errorCodes.VINNOERRORCD.errorMessage;
            } else {
                errorCode = errorCodes.INTERNALERRCD.errorCode, message = error.details[0].message;
            }
            const response = {
                type: 'response',
                status: false,
                errorCode: errorCode,
                message: message
            }
            sendResponse(req, res, response);
        } else {
            require('../Login/api/phoneAndVinAuthentication.js')(req, res, sendResponse);
        }
    })
    .post(['/SendOTP'], (req, res) => {
        const { error } = sendOTPSchema.validate(req.body);
        if (error) {
            if (error.details[0].context['key'] == 'token') {
                errorCode = errorCodes.TOKENERRORCD.errorCode, message = errorCodes.TOKENERRORCD.errorMessage;
            } else if (error.details[0].context['key'] == "mobile") {
                errorCode = errorCodes.PHONENOERRORCD.errorCode, message = errorCodes.PHONENOERRORCD.errorMessage;
            } else {
                errorCode = errorCodes.INTERNALERRCD.errorCode, message = error.details[0].message;
            }
            const response = {
                type: 'response',
                status: false,
                errorCode: errorCode,
                message: message
            }
            sendResponse(req, res, response);
        } else {
            require('../OTP/api/sendOTP.js')(req, res, sendResponse);
        }
    })
    .post(['/validateOTP'], (req, res) => {
        const { error } = validateOTPSchema.validate(req.body);
        if (error) {
            if (error.details[0].context['key'] == "phoneNo") {
                errorCode = errorCodes.PHONENOERRORCD.errorCode, message = errorCodes.PHONENOERRORCD.errorMessage;
            } else if (error.details[0].context['key'] == "userId") {
                errorCode = errorCodes.USERIDERRORCD.errorCode, message = errorCodes.USERIDERRORCD.errorMessage;
            } else if (error.details[0].context['key'] == "token") {
                errorCode = errorCodes.TOKENERRORCD.errorCode, message = errorCodes.TOKENERRORCD.errorMessage;
            } else if (error.details[0].context['key'] == "otp") {
                errorCode = errorCodes.OTPERRORCD.errorCode, message = errorCodes.OTPERRORCD.errorMessage;
            } else {
                errorCode = errorCodes.INTERNALERRCD.errorCode, message = error.details[0].message;
            }
            const response = {
                type: 'response',
                status: false,
                errorCode: errorCode,
                message: message
            }
            sendResponse(req, res, response);
        } else {
            require('../OTP/api/validateOTP.js')(req, res, sendResponse);
        }
    })
    .post(['/resendOTP'], (req, res) => {
        const { error } = resendOTPSchema.validate(req.body);
        if (error) {
            if (error.details[0].context['key'] == "userId") {
                errorCode = errorCodes.USERIDERRORCD.errorCode, message = errorCodes.USERIDERRORCD.errorMessage;
            } else if (error.details[0].context['key'] == "token") {
                errorCode = errorCodes.TOKENERRORCD.errorCode, message = errorCodes.TOKENERRORCD.errorMessage;
            } else {
                errorCode = errorCodes.INTERNALERRCD.errorCode, message = error.details[0].message;
            }
            const response = {
                type: 'response',
                status: false,
                errorCode: errorCode,
                message: message
            }
            sendResponse(req, res, response);
        } else {
            require('../OTP/api/resendOTP.js')(req, res, sendResponse);
        }
    })
    .post(['/AddSecondaryUser'], (req, res) => {
        const { error } = secondaryUserSchema.validate(req.body);
        if (error) {
            if (error.details[0].context['key'] == "token") {
                errorCode = errorCodes.TOKENERRORCD.errorCode, message = errorCodes.TOKENERRORCD.errorMessage;
            } else if (error.details[0].context['key'] == "userId") {
                errorCode = errorCodes.USERIDERRORCD.errorCode, message = errorCodes.USERIDERRORCD.errorMessage;
            } else if (error.details[0].context['key'] == "primaryPhoneNo") {
                errorCode = errorCodes.PHONENOERRORCD.errorCode, message = errorCodes.PHONENOERRORCD.errorMessage;
            } else {
                errorCode = errorCodes.INTERNALERRCD.errorCode, message = error.details[0].message;
            }
            const response = {
                type: 'response',
                status: false,
                errorCode: errorCode,
                message: message
            }
            sendResponse(req, res, response);
        } else {
            require('../user/api/sendOtpToAddSecondaryuser.js')(req, res, sendResponse);
        }
    })
    .post(['/SaveSecondaryUser'], (req, res) => {
        const { error } = saveSecondaryuserSchema.validate(req.body);
        if (error) {
            if (error.details[0].context['key'] == "userId") {
                errorCode = errorCodes.USERIDERRORCD.errorCode, message = errorCodes.USERIDERRORCD.errorMessage;
            } else if (error.details[0].context['key'] == "token") {
                errorCode = errorCodes.TOKENERRORCD.errorCode, message = errorCodes.TOKENERRORCD.errorMessage;
            } else if (error.details[0].context['key'] == "primaryPhoneNo") {
                errorCode = errorCodes.PPHONENOERRORCD.errorCode, message = errorCodes.PPHONENOERRORCD.errorMessage;
            } else if (error.details[0].context['key'] == "secondaryPhoneNo") {
                errorCode = errorCodes.SPHONENOERRORCD.errorCode, message = errorCodes.SPHONENOERRORCD.errorMessage;
            } else if (error.details[0].context['key'] == "otp") {
                errorCode = errorCodes.OTPERRORCD.errorCode, message = errorCodes.OTPERRORCD.errorMessage;
            } else {
                errorCode = errorCodes.INTERNALERRCD.errorCode, message = error.details[0].message;
            }
            const response = {
                type: 'response',
                status: false,
                errorCode: errorCode,
                message: message
            }
            sendResponse(req, res, response);
        } else {
            require('../user/api/saveSecondaryuser.js')(req, res, sendResponse);
        }
    })
    .post(['/RefreshToken'], (req, res) => {
        const { error } = refreshTokenSchema.validate(req.body);
        if (error) {
            if (error.details[0].context['key'] == "userId") {
                errorCode = errorCodes.USERIDERRORCD.errorCode, message = errorCodes.USERIDERRORCD.errorMessage;
            } else if (error.details[0].context['key'] == "refreshToken") {
                errorCode = errorCodes.RTOKENERRORCD.errorCode, message = errorCodes.RTOKENERRORCD.errorMessage;
            } else {
                errorCode = errorCodes.INTERNALERRCD.errorCode, message = error.details[0].message;
            }
            const response = {
                type: 'response',
                status: false,
                errorCode: errorCode,
                message: message
            }
            sendResponse(req, res, response);
        } else {
            require('../token/api/refreshToken.js')(req, res, sendResponse);
        }
    })
    .post(['/UserDetails'], (req, res) => {
        const { error } = saveOrUpdatePrimaryUserSchema.validate(req.body);
        if (error) {
            if (error.details[0].context['key'] == "token") {
                errorCode = errorCodes.TOKENERRORCD.errorCode, message = errorCodes.TOKENERRORCD.errorMessage;
            } else if (error.details[0].context['key'] == "userId") {
                errorCode = errorCodes.USERIDERRORCD.errorCode, message = errorCodes.USERIDERRORCD.errorMessage;
            } else if (error.details[0].context['key'] == "phoneNo") {
                errorCode = errorCodes.PHONENOERRORCD.errorCode, message = errorCodes.PHONENOERRORCD.errorMessage;
            } else {
                errorCode = errorCodes.INTERNALERRCD.errorCode, message = error.details[0].message;
            }
            const response = {
                type: 'response',
                status: false,
                errorCode: errorCode,
                message: message
            }
            sendResponse(req, res, response);
        } else {
            require('../user/api/saveOrUpdatePrimaryUserDetails.js')(req, res, sendResponse);
        }
    })
    .post(['/MyVehicles'], (req, res) => {
        const { error } = getVehicleDetailsSchema.validate(req.body);
        if (error) {
            if (error.details[0].context['key'] == "phoneNo") {
                errorCode = errorCodes.PHONENOERRORCD.errorCode, message = errorCodes.PHONENOERRORCD.errorMessage;
            } else if (error.details[0].context['key'] == "token") {
                errorCode = errorCodes.TOKENERRORCD.errorCode, message = errorCodes.TOKENERRORCD.errorMessage;
            } else if (error.details[0].context['key'] == "userId") {
                errorCode = errorCodes.USERIDERRORCD.errorCode, message = errorCodes.USERIDERRORCD.errorMessage;
            } else {
                errorCode = errorCodes.INTERNALERRCD.errorCode, message = error.details[0].message;
            }
            const response = {
                type: 'response',
                status: false,
                errorCode: errorCode,
                message: message
            }
            sendResponse(req, res, response);
        } else {
            require('../vehicleDetails/api/myVehicleDetails.js')(req, res, sendResponse);
        }
    })
    .post(['/AddVehicle'], (req, res) => {
        const { error } = addVehicleSchema.validate(req.body);
        if (error) {
            if (error.details[0].context['key'] == "token") {
                errorCode = errorCodes.TOKENERRORCD.errorCode, message = errorCodes.TOKENERRORCD.errorMessage;
            } else if (error.details[0].context['key'] == "userId") {
                errorCode = errorCodes.USERIDERRORCD.errorCode, message = errorCodes.USERIDERRORCD.errorMessage;
            } else if (error.details[0].context['key'] == "vinNo") {
                errorCode = errorCodes.VINNOERRORCD.errorCode, message = errorCodes.VINNOERRORCD.errorMessage;
            } else {
                errorCode = errorCodes.INTERNALERRCD.errorCode, message = error.details[0].message;
            }
            const response = {
                type: 'response',
                status: false,
                errorCode: errorCode,
                message: message
            }
            sendResponse(req, res, response);
        } else {
            require('../vehicleDetails/api/addVehicle.js')(req, res, sendResponse);
        }
    })
    .post(['/encrpytString'], (req, res) => {
        require('../generateAES/api/encrptData.js')(req, res, sendResponse);
    })

module.exports = router;