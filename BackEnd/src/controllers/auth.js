import Auth from "../models/auth.js";
import Token from "../models/token.js";
import bcrypt from "bcryptjs";
import { signupSchema, signinSchema } from "../Schemas/auth.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";
import { v4 as uuidv4 } from 'uuid';

export const me = async (req, res) => {
    if (!req.session.userId) {
        return res.status(201).json(null);
    }

    const user = await Auth.findOne({ _id: req.session.userId });

    user.password = undefined;
    user.cardnumber = undefined;

    return res.status(200).json(user);
};

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
            email: req.body.email,
            password: hashedPassword,
            images: req.body.images,
            avatar: req.body.avatar,
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
const maxLoginAttempts = 3;
// const baseLockoutDuration = 5 *60* 1000; // 5 phút

const baseLockoutDuration = 5 * 1000; // 5 s để test cho nhanh

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

        const attemptsLeft = maxLoginAttempts - (auth.loginAttempts || 0);

        // Kiểm tra thời gian khóa
        if (auth.lockedUntil && auth.lockedUntil > new Date()) {
            const remainingTime = Math.ceil((auth.lockedUntil - new Date()) / 1000);

            return res.status(403).json({
                message: `Tài khoản đã bị khóa do bạn đã nhập sai nhiều lần. Vui lòng thử lại sau ${remainingTime} giây.`,
                attemptsLeft: 0,
                lockedUntil: auth.lockedUntil,
            });
        }

        const isMatch = await bcrypt.compare(password, auth.password);

        if (!isMatch) {
            auth.loginAttempts = (auth.loginAttempts || 0) + 1;

            if (auth.loginAttempts >= maxLoginAttempts) {
                const timeSinceLastAttempt = new Date() - auth.lastFailedAttempt;

                // Nếu đã nhập sai 5 lần và vẫn nhập sai sau thời gian khóa
                if (timeSinceLastAttempt >= baseLockoutDuration) {
                    auth.lockedUntil = new Date(Date.now() + baseLockoutDuration);
                } else {
                    const lockoutDuration = baseLockoutDuration * Math.pow(2, auth.loginAttempts - maxLoginAttempts);
                    auth.lockedUntil = new Date(Date.now() + lockoutDuration);
                }
            }

            auth.lastFailedAttempt = new Date();

            await auth.save();

            const attemptsLeft = maxLoginAttempts - auth.loginAttempts;

            return res.status(400).json({
                message: "Mật khẩu không đúng",
                attemptsLeft,
            });
        }

        // Đăng nhập thành công, reset số lần thử đăng nhập
        auth.loginAttempts = 0;
        auth.lastFailedAttempt = null;

        await auth.save();

        const token = jwt.sign({ id: auth._id }, "123456", { expiresIn: "1d" });

        res.cookie("accessToken", token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
        });

        req.session.userId = auth.id;
        req.session.accessToken = token;

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



export const logout = (req, res) => {
    return new Promise((resolve, _reject) => {
        res.clearCookie("accessToken");
        req.session.destroy((error) => {
            if (error) {
                console.log("SESSION_ERROR", error);
                resolve(false);
                return res.status(201).json(false)
            }
            resolve(true);
            return res.status(201).json(true)
        });
    });
};

export const forgotPassword = async (req, res) => {

    const { email, otp } = req.body;

    const user = await Auth.findOne({ email })

    if (!user) return res.status(201).json({ success: false });

    await Token.findOneAndDelete({ userId: user._id })

    const resetToken = uuidv4();

    const hashResetToken = await bcrypt.hash(resetToken, 10);

    await new Token({ userId: `${user.id}`, token: hashResetToken }).save();

    await sendEmail(email, otp)

    return res.status(200).json({ success: true, otp, token: hashResetToken, userId: user._id })
}

export const changePassword = async (req, res) => {
    const { password, token, userId } = req.body;


    try {
        const resetPasswordTokenRecord = await Token.findOne({ userId });

        if (!resetPasswordTokenRecord) return res.status(401).json({ message: 'Token không hợp lệ' });

        const resetPasswordTokenValid = bcrypt.compare(resetPasswordTokenRecord.token, token);

        if (!resetPasswordTokenValid) return res.status(401).json({ message: 'Token không hợp lệ' });

        const user = await Auth.findOne({ _id: userId });

        if (!user) return res.status(400).json({ message: 'Người dùng không tồn tại' });

        const updatedPassword = await bcrypt.hash(password, 10);

        await Auth.updateOne({ _id: userId }, { password: updatedPassword });

        await resetPasswordTokenRecord.deleteOne();

        return res.status(201).json({ success: true });

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}
