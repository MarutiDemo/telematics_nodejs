const Joi = require('joi');

const schema = Joi.object().keys({
    token: Joi.string().min(1).required(),
    primaryPhoneNo: Joi.string().min(1).required(),
    userId: Joi.string().min(1).required(),
    vinNo: Joi.string().min(1).required(),
    regNo: Joi
})

module.exports = schema;