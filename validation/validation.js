const Joi = require('joi');
exports.validateRegistered = (user) => {
    const schema = Joi.object().keys({
        name: Joi.string().alphanum().min(3).max(30).required(),
        lastName: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().required().min(4),
        email: Joi.string().email({ minDomainAtoms: 2 })
    });
    return Joi.validate(user,schema);
}
exports.validateLoginUser = (user) => {
    const schema = Joi.object().keys({
        password: Joi.string().required().min(4),
        email: Joi.string().email({ minDomainAtoms: 2 })
    });
    return Joi.validate(user,schema);
}