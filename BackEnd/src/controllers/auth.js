import Auth from "../models/auth";
import bcrypt  from "bcryptjs"
import { signupSchema } from "../Schemas/auth";
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
    try {
        const { error } = signupSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }
        // Kiểm tra xem user đã đk chưa?
        const authExist = await Auth.findOne({ email: req.body.email });
        if (authExist) {
            return res.status(400).json({
                message: "Email đã tồn tại",
            });
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const auth = await Auth.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });

        // Tạo token
        const token = jwt.sign({ id: auth._id }, "123456", { expiresIn: "7d" });
        // không trả về password
        auth.password = undefined;

        return res.status(201).json({
            message: "Tạo tài khoản thành công",
            accessToken: token,
            user,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};


