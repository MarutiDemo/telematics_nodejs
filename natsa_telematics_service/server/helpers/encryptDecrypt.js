'use strict'
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const inputEncoding = 'utf-8';
const outputEncoding = 'base64';
require('dotenv').config();
const responseErrorCode = require('./errorCodes.json');
let responseObject = {};

module.exports = {
    encryptData: ((inputText) => {
        try {
            return new Promise((resolve, reject) => {
                if (process.env.PRIVATE_KEY == "" || process.env.PRIVATE_KEY == undefined) {
                    responseObject.code = responseErrorCode.INTERNALERRCD.errorCode;
                    responseObject.status = false;
                    responseObject.message = responseErrorCode.INTERNALERRCD.errorMessage;
                    responseObject.convertedData = {};
                    resolve(responseObject);
                } else if (process.env.AESIV == "" || process.env.AESIV == undefined) {
                    responseObject.code = responseErrorCode.INTERNALERRCD.errorCode;
                    responseObject.status = false;
                    responseObject.message = responseErrorCode.INTERNALERRCD.errorMessage;
                    responseObject.convertedData = {};
                    resolve(responseObject);
                } else {
                    const key = Buffer.from(process.env.PRIVATE_KEY, inputEncoding);
                    const iv = Buffer.from(process.env.AESIV, inputEncoding);
                    let cipher = crypto.createCipheriv(algorithm, key, iv);
                    let ciphered = cipher.update(inputText, inputEncoding, outputEncoding);
                    ciphered += cipher.final(outputEncoding);
                    responseObject.code = responseErrorCode.SUCCESSCD.code;
                    responseObject.status = true;
                    responseObject.message = responseErrorCode.SUCCESSCD.message;
                    responseObject.convertedData = ciphered;
                    resolve(responseObject);
                }
            })
        } catch (error) {
            console.info(error);
        }
    }),

    decryptData: ((base64String) => {
        try {
            return new Promise((resolve, reject) => {
                if (process.env.PRIVATE_KEY == "" || process.env.PRIVATE_KEY == undefined) {
                    responseObject.decryptStatus = false;
                    responseObject.convertedData = {};
                    resolve(responseObject);
                } else if (process.env.AESIV == "" || process.env.AESIV == undefined) {
                    responseObject.decryptStatus = false;
                    responseObject.convertedData = {};
                    resolve(responseObject);
                } else {
                    if (base64String) {
                        if (Buffer.from(base64String, 'base64').toString('base64') === base64String) {
                            try {
                                const buff = Buffer.from(base64String, outputEncoding);
                                const key = Buffer.from(process.env.PRIVATE_KEY, inputEncoding);
                                const iv = Buffer.from(process.env.AESIV, inputEncoding);
                                const dectext = crypto.createDecipheriv(algorithm, key, iv);
                                const decreyptedText = dectext.update(buff) + dectext.final();
                                responseObject.decryptStatus = true;
                                responseObject.convertedData = decreyptedText;
                                resolve(responseObject);
                            } catch (error) {
                                responseObject.decryptStatus = false;
                                responseObject.convertedData = {};
                                resolve(responseObject);
                            }
                        } else {
                            responseObject['status'] = false;
                            responseObject.convertedData = {};
                            resolve(responseObject);
                        }
                    } else {
                        responseObject['status'] = false;
                        responseObject.convertedData = {};
                        resolve(responseObject);
                    }
                }
            })
        } catch (error) {
            console.info(error);
        }
    })
}