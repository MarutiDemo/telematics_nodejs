const Joi = require('joi');

const schema = Joi.object().keys({
    phoneNo: Joi.string().min(1).required(),
    token: Joi.string().min(1).required(),
    userId: Joi.string().min(1).required()
});

module.exports = schema;