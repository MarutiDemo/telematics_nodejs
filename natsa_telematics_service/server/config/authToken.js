let Joi = require('joi');

// CREATING UNIQUE SCHEMA OBJECT FOR VALIDATION
const schema = Joi.object().keys({
    msil_authorization: Joi.string().required()
}).unknown(true);

module.exports = schema;