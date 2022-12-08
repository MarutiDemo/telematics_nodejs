const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const inputEncoding = 'utf-8';
const outputEncoding = 'base64';
const aesIv = new Buffer('@1B2c3D4e5F6g7H8');
const BitConverter = require('bit-converter');
const moment = require('moment-timezone');
// const { buffer, object } = require('assert-plus');
const bytesConvert = require('bytes-convert');
const { Int64BE } = require("int64-buffer");
var exec = require('child_process').execFile;
let path = require('../natsa_telematics_service/')
const ticksToDate = require('ticks-to-date');




require('dotenv').config();


function encrypt(aesKey, text) {
    const key = Buffer.from(aesKey, inputEncoding);
    const iv = Buffer.from(aesIv, inputEncoding);
    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let ciphered = cipher.update(text, inputEncoding, outputEncoding);
    ciphered += cipher.final(outputEncoding);
    return ciphered;
}

const key = process.env.PRIVATE_KEY;
const text = '9826151641';
const base64Text = "4BMulhmxVyjMdYGzPRk4AtCvjD0eXIJi54OdTz8WhpE=";
const encrypted = encrypt(key, text);
console.log("Ciphertext (hex): " + encrypted);

function decrypt(string, aeskey) {
    try {
        const buff = Buffer.from(string, outputEncoding);
        const key = Buffer.from(aeskey, inputEncoding);
        const iv = Buffer.from(aesIv, inputEncoding);
        const dectext = crypto.createDecipheriv(algorithm, key, iv);
        const decreyptedText = dectext.update(buff) + dectext.final();
        return decreyptedText;
    } catch (exception) {
        console.info("EXCEP:", exception)
    }
}

// const decrypted = decrypt(base64Text, key);
// console.info("DECRYPTED TEXT:" + decrypted);





