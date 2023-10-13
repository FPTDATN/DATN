import joi from "joi";

export const signupSchema = joi.object({
    username: joi.string().regex(/^[a-zA-Z0-9]+$/).required().messages({
        "string.empty": "Tên đăng nhập không được để trống",
        "any.required": "Trường tên đăng nhập là bắt buộc",
        "string.pattern.base": "Tên đăng nhập chỉ chấp nhận các ký tự chữ cái và số",
      }),
    email: joi.string().email().required().messages({
        "string.empty": "Email không được để trống",
        "any.required": "Trường email là bắt buộc",
    }),

    firstName: joi.string().required().messages({
        "string.empty": "firstName không được để trống",
        "any.required": "Trường tên là bắt buộc",
    }),

    avatar: joi.string(),
    rule:joi.boolean(),
    cardnumber:joi.number(),
    address:joi.string(),

    lastName: joi.string().required().messages({
        "string.empty": "lastName không được để trống",
        "any.required": "Trường họ là bắt buộc",
    }),
    fullName: joi.string().required().messages({
        "string.empty": "fullName không được để trống",
        "any.required": "Trường Tên đầy đủ là bắt buộc",
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
    usernameOrEmail: joi.string().required().messages({
        "string.empty": "không được để trống",
        "any.required": "Trường là bắt buộc",
    }),
    password: joi.string().required().min(6).messages({
        "string.empty": "Mật khẩu không được để trống",
        "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
        "any.require": "Trường mật khẩu là bắt buộc",
    }),
});