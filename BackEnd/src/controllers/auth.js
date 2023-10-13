import Auth from "../models/auth.js";
import bcrypt from "bcryptjs";
import { signupSchema, signinSchema } from "../Schemas/auth.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    try {
        const { error } = signupSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }
        const authExist = await Auth.findOne({ email: req.body.email });
        if (authExist) {
            return res.status(400).json({
                message: "Email đã tồn tại",
            });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const auth = await Auth.create({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            phone: req.body.phone,
            country: req.body.country,
            images: req.body.images,
            avatar:req.body.avatar,
            rule: req.body.rule,
            email: req.body.email,
            password: hashedPassword,
        });

        const token = jwt.sign({ id: auth._id }, "123456", { expiresIn: "7d" });
        auth.password = undefined;

        return res.status(201).json({
            message: "Tạo tài khoản thành công",
            accessToken: token,
            auth,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

export const signin = async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;
        const { error } = signinSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: error.details.map((err) => err.message),
            });
        }

        const auth = await Auth.findOne(
            usernameOrEmail.includes("@")
                ? { email: usernameOrEmail }
                : { username: usernameOrEmail }
        );

        if (!auth) {
            return res.status(400).json({
                message: usernameOrEmail.includes("@")
                    ? "Email không tồn tại"
                    : "Tên người dùng không đúng",
            });
        }

        const isMatch = await bcrypt.compare(password, auth.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Mật khẩu không đúng",
            });
        }

        const token = jwt.sign({ id: auth._id }, "123456", { expiresIn: "1d" });

        res.cookie("accessToken", token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
        });

        auth.password = undefined;

        return res.status(200).json({
            message: "Đăng nhập thành công",
            accessToken: token,
            auth,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
