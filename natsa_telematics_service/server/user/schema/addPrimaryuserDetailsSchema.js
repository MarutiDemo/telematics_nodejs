const Joi = require('joi');

const schema = Joi.object().keys({
    token: Joi.string().min(1).required(),
    userId: Joi.string().min(1).required(),
    phoneNo: Joi.string().min(1).required(),
    fullName: Joi,
    email: Joi,
    relationship: Joi
})
module.exports = schema;