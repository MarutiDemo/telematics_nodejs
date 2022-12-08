'use strict'
const Joi = require('joi');

const schema = Joi.object().keys({
    refreshToken: Joi.string().min(1).required(),
    userId: Joi.string().min(1).required()
})

module.exports = schema;