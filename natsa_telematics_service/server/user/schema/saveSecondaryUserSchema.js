'use strict'
const Joi = require('joi');

const schema = Joi.object().keys({
    userId: Joi.string().min(1).required(),
    token: Joi.string().min(1).required(),
    secondaryPhoneNo: Joi.string().min(1).required(),
    primaryPhoneNo: Joi.string().min(1).required(),
    fullName: Joi,
    email: Joi,
    vinNo: Joi,
    relationship: Joi,
    otp: Joi.string().min(1).required()
});

module.exports = schema;