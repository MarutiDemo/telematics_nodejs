const Joi = require('joi');

const schema = Joi.object().keys({
    token: Joi.string().min(1).required(),
    mobile: Joi.string().min(1).required(),
    username: Joi,
    password: Joi,
    otpText: Joi
})

module.exports = schema;