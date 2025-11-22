import express from 'express';
import { isAuthenticated, login, logout, resetPassword, sendResetOtp, sendVerifyOtp, signup, verifyEmail } from '../controller/authControllers.js';
import userAuth from '../middleware/userAuth.js';
const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp);
authRouter.post('/verify-account',userAuth, verifyEmail);
authRouter.get('/is-auth', userAuth, isAuthenticated);
authRouter.post('/send-reset-otp', sendResetOtp);
authRouter.post('/reset-password', resetPassword);

export default authRouter; 