const Joi = require('joi');

const schema = Joi.object().keys({
    token: Joi.string().min(1).required(),
    userId: Joi.string().min(1).required(),
    primaryPhoneNo: Joi.string().min(1).required()
});

module.exports = schema;