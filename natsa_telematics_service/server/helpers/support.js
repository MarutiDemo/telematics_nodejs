'use strict'
const ENCRYPTnDECRYPT = require('../helpers/encryptDecrypt');
const otpGenerator = require('otp-generators')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const moment = require('moment-timezone');
const UUID = require('uuid');
const axios = require('axios').default;

module.exports = {
    decryptedObject: ((requestObject) => {
        let resultObject = {};
        let responseData = {};
        try {
            return new Promise(async (resolve, reject) => {
                for (let key in requestObject) {
                    if (requestObject.hasOwnProperty(key)) {
                        if (requestObject[key]) {
                            let decryptResponse = await ENCRYPTnDECRYPT.decryptData(`${requestObject[key]}`);
                            if (decryptResponse.decryptStatus == true) {
                                resultObject[`${key}`] = decryptResponse.convertedData;
                                responseData.decryptedStatus = true;
                                responseData.decryptedData = resultObject;
                                continue;
                            } else {
                                responseData.errorKey = `${key}`;
                                responseData.decryptedStatus = false;
                                responseData.decryptedData = {};
                                break;
                            }
                        }
                    }
                }
                resolve(responseData);
            })
        } catch (error) {
            return false;
        }
    }),
    encryptedObject: ((requestObject) => {
        let resultObject = {};
        let responseData = {};
        try {
            return new Promise(async (resolve, reject) => {
                for (let key in requestObject) {
                    if (requestObject.hasOwnProperty(key)) {
                        if (requestObject[key]) {
                            let decryptResponse = await ENCRYPTnDECRYPT.encryptData(`${requestObject[key]}`);
                            if (decryptResponse.status == true) {
                                resultObject[`${key}`] = decryptResponse.convertedData;
                                responseData.encryptedStatus = true;
                                responseData.encryptedData = resultObject;
                            } else {
                                responseData.encryptedStatus = false;
                                responseData.encryptedData = {};
                            }
                        }
                    }
                }
                resolve(responseData);
            })
        } catch (error) {
            return false;
        }
    }),
    generateOTP: (() => {
        let responseData = {};
        try {
            return new Promise((resolve, reject) => {
                let generatedOTP = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChar: false });
                if (generatedOTP != "" || generatedOTP != undefined) {
                    responseData.generateOTPStatus = true;
                    responseData.generateOTPMessage = "OTP Generated Successfully";
                    responseData.generatedOTPData = generatedOTP;
                    resolve(responseData);
                } else {
                    responseData.generateOTPStatus = false;
                    responseData.generateOTPMessage = "Error while generating OTP";
                    responseData.generatedOTPData = String.empty;
                    resolve(responseData);
                }
            })
        } catch (error) {
            console.info(error);
            return false;
        }
    }),

    validateToken: ((token) => {
        let responseData = {};
        try {
            return new Promise(async (resolve, reject) => {
                let decryptResponse = await ENCRYPTnDECRYPT.decryptData(token);
                jwt.verify(decryptResponse.convertedData, process.env.PRIVATE_KEY, function (err) {
                    if (err) {
                        responseData.status = false;
                    } else {
                        responseData.status = true;
                    }
                    resolve(responseData);
                });
            })
        } catch (error) {
            return false;
        }
    }),

    generateToken: (() => {
        let responseData = {};
        let encryptResponse = "";
        let tokenData = {
            userID: UUID.v1()
        }
        try {
            return new Promise(async (resolve, reject) => {
                let token = jwt.sign(tokenData, process.env.PRIVATE_KEY, {
                    expiresIn: '4h'
                });
                if (token == "" || token == undefined) {
                    responseData.genTokenStatus = false;
                    responseData.genTokenData = "";
                    resolve(responseData);
                } else {
                    encryptResponse = await ENCRYPTnDECRYPT.encryptData(token);
                    if (encryptResponse.status == true) {
                        responseData.genTokenStatus = true;
                        responseData.genTokenData = encryptResponse.convertedData;
                    } else {
                        responseData.genTokenStatus = false;
                        responseData.genTokenData = "";
                    }
                    resolve(responseData);
                }
            })
        } catch (error) {
            return false;
        }
    }),

    sendOTP: (() => {
        try {
            axios.get(`https://sms.tatacommunications.com:3821/sendsms?from=MSILOT&username=m_msil_vf&password=5w2FVdu9&to=+919740898046&text='Hello'`)
                .then(function (response) {
                    // handle success
                    console.log(response);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        } catch (error) {
            return false;
        }
    })
}