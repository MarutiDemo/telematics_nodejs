'use strict';
process.title = 'auth_server';
const decryptionResponse = require('../helpers/encryptDecrypt.js');

module.exports = {
    validateAuthToken: (async (headers) => {
        try {
            return new Promise(async (resolve, reject) => {
                let response = "";
                var decoded_value = await decryptionResponse.decryptData(headers.msil_authorization);
                let { decryptStatus, convertedData } = decoded_value;
                if (decryptStatus == true) {
                    if (process.env.AUTH_TOKEN == convertedData) {
                        response = true;
                    } else {
                        response = false;
                    }
                } else {
                    response = false;
                }
                resolve(response);
            })
        } catch (error) {
            console.info(error);
        }
    })
};