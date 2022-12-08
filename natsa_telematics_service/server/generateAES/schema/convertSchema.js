const Joi = require('joi');

const schema = Joi.object().keys({
    input: Joi.string().min(1).required()
})
module.exports = schema;