const Joi = require("joi");

const User = function (userData) {
    this.user_name = userData.user_name,
    this.gender = userData.gender,
    this.age = userData.age ? parseInt(userData.age) : 0
}

const validateUser = function (userData) {
    let schema = Joi.object().keys({
        user_name: Joi.string().required(),
        gender: Joi.string().valid("Male", "Female", "Others").required(),
        age: Joi.number().min(18).max(120).required()
    });
    return schema.validate(userData);
}

const UpdateUser = function (userData) {
    this.user_id = userData.user_id,
    this.user_name = userData.user_name,
    this.gender = userData.gender,
    this.age = userData.age ? parseInt(userData.age) : 0
}

const validateUpdateUser = function (userData) {
    let schema = Joi.object().keys({
        user_id: Joi.number().required(),
        user_name: Joi.string().required(),
        gender: Joi.string().valid("Male", "Female", "Others").required().error(
            new Error("Gender must be of Male, Female or Others")
        ),
        age: Joi.number().min(18).max(120).required()
    });
    return schema.validate(userData);
}


module.exports = {
    User,
    validateUser,
    UpdateUser,
    validateUpdateUser
}