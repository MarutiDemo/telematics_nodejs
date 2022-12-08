const Joi = require('joi');

const schema = Joi.object().keys({
    phoneNo: Joi.string().min(1).required(),
    vinNo: Joi.string().min(1).required(),
    regNo: Joi,
    token: Joi.string().min(1).required(),
    appPackage: Joi,
    appVersion: Joi,
    deviceId: Joi,
    deviceToken: Joi,
    deviceType: Joi
});

module.exports = schema;