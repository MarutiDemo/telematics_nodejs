const Joi = require('joi');

const schema = Joi.object().keys({
    vinNo: Joi.string().min(1).required(),
    regNo: Joi,
})

module.exports = schema;