import joi from "joi";

export const signupSchema = joi.object({
    username: joi.string().required().messages({
        "string.empty": "username không được để trống",
        "any.required": "Trường tên là bắt buộc",
    }),
    email: joi.string().email().required().messages({
        "string.empty": "Email không được để trống",
        "any.required": "Trường email là bắt buộc",
    }),

    firName: joi.string().required().messages({
        "string.empty": "firName không được để trống",
        "any.required": "Trường tên là bắt buộc",
    }),

    avatar: joi.string(),
    country:joi.string(),
    rule:joi.string(),
    country:joi.string(),
    cardnumber:joi.string(),
    address:joi.string(),

    lastName: joi.string().required().messages({
        "string.empty": "lastName không được để trống",
        "any.required": "Trường tên là bắt buộc",
    }),

    fullName: joi.string().required().messages({
        "string.empty": "fullName không được để trống",
        "any.required": "Trường tên là bắt buộc",
    }),

    phone: joi.number().required().min(11).messages({
        "string.empty": "Phone không được để trống",
        "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
        "any.require": "Trường mật khẩu là bắt buộc",
    }),
    

    password: joi.string().required().min(6).messages({
        "string.empty": "Mật khẩu không được để trống",
        "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
        "any.require": "Trường mật khẩu là bắt buộc",
    }),
    confirmPassword: joi.string().valid(joi.ref("password")).required().messages({
        "string.empty": "Xác nhận mật khẩu không được để trống",
        "any.only": "Xác nhận mật khẩu không khớp",
        "any.required": "Trường xác nhận mật khẩu là bắt buộc",
    }),

});


export const signinSchema = joi.object({
    email: joi.string().email().required().messages({
        "string.empty": "Email không được để trống",
        "any.required": "Trường email là bắt buộc",
    }),
    username: joi.string().required().messages({
        "string.empty": "username không được để trống",
        "any.required": "Trường tên là bắt buộc",
    }),
    password: joi.string().required().min(6).messages({
        "string.empty": "Mật khẩu không được để trống",
        "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
        "any.require": "Trường mật khẩu là bắt buộc",
    }),
});