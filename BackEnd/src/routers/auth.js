import express from "express";
import { signin, signup, me, logout } from "../controllers/auth.js";

const router = express.Router();

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/me', me)
router.post('/logout', logout)

export default router