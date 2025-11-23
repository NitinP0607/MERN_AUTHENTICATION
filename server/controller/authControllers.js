import bcrypt from 'bcryptjs';
import JsonWebToken from 'jsonwebtoken';
import userModel from '../model/userModel.js';
import transporter from '../config/nodemailer.js'
import apiInstance from "../config/brevoClient.js";

//Signup  logic
export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.json({ success: false, message: 'All details are required' })
    }
    try {
        const existing = await userModel.findOne({ email });
        if (existing) {
            return res.json({ success: false, message: 'user already exist' })
        }
        const hashedpass = await bcrypt.hash(password, 10);
        const user = new userModel({ name, email, password: hashedpass });
        await user.save();

        const token = JsonWebToken.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        const isDev = process.env.NODE_ENV === "development";

        res.cookie("token", token, {
            httpOnly: true,
            secure: isDev ? false : true,   // false in dev, true in production
            sameSite: isDev ? "lax" : "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

       

         // Send welcome email using Brevo REST API
        const welcomeEmail = {
            sender: { name: "N-Technologies", email: process.env.SENDER_EMAIL },
            to: [{ email: user.email }],
            subject: "Welcome to N-Technologies",
            textContent: `Welcome, ${name}! Your account has been created with email: ${email}.`,
        };

        apiInstance.sendTransacEmail(welcomeEmail)
            .then(() => console.log("Welcome email sent"))
            .catch((err) => console.log("Email error:", err));

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

//Login Logic
export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ success: false, message: 'Email and Password fields are required' })
    }
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: 'Invalid email id' })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Password is not valid' })
        }
        const token = JsonWebToken.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        const isDev = process.env.NODE_ENV === "development";

        res.cookie("token", token, {
            httpOnly: true,
            secure: isDev ? false : true,   // false in dev, true in production
            sameSite: isDev ? "lax" : "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        return res.json({ success: true });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

//Logout Logic

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,            // Render requires secure cookies
            sameSite: "none",
        })
        return res.json({ success: true, message: 'Logout successfully' })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const sendVerifyOtp = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await userModel.findOne({ email });

        if (user.isAccountVerified) {
            return res.json({ success: false, message: "Account already verified" })
        }
        const Otp = String(Math.floor(100000 + Math.random() * 900000));
        user.verifyOtp = Otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
        await user.save();

         // Prepare email content for Brevo API
        const verifyEmail = {
            sender: { name: "N-Technologies", email: process.env.SENDER_EMAIL },
            to: [{ email: user.email }],
            subject: "Account Verification OTP",
            textContent: `Your OTP is ${Otp}. It is valid for 24 hours.`,
        };

        // Send OTP email using Brevo REST API
        apiInstance.sendTransacEmail(verifyEmail)
            .then(() => console.log("Verification OTP email sent"))
            .catch((err) => console.log("Email Error:", err));

        return res.json({ success: true, message: "Verification OTP sent on Email" });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const verifyEmail = async (req, res) => {
    const { email, Otp } = req.body;

    if (!email || !Otp) {
        return res.json({ success: false, message: "Missing details" })
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        if (user.verifyOtp === '' || user.verifyOtp !== Otp) {
            return res.json({ success: false, message: "Invalid Otp" })
        }

        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({ success: "false", message: "OTP expired" })
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();
        return res.json({ success: true, message: "Email verified successfully" })


    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

//check user is authenticated
export const isAuthenticated = async (req, res) => {

    try {
        return res.json({ success: true });
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

// password reset OTP

export const sendResetOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.json({ success: false, message: "Email is required " })
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "Email is not linked with our database" });
        }
        const Otp = String(Math.floor(100000 + Math.random() * 900000));
        user.resetOtp = Otp;
        user.resetOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
        await user.save();

         // Brevo REST API email content
        const resetEmail = {
            sender: { name: "N-Technologies", email: process.env.SENDER_EMAIL },
            to: [{ email: user.email }],
            subject: "Password Reset OTP",
            textContent: `Your OTP to reset password is: ${Otp}. It is valid for 24 hours.`
        };

        // Send email in background (non-blocking)
        apiInstance.sendTransacEmail(resetEmail)
            .then(() => console.log("Reset OTP email sent"))
            .catch(err => console.log("Email Error:", err));

        return res.json({
            success: true,
            message: "OTP sent to your email"
        });

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        });
    }
};

//reset user password

export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.json({ success: false, message: "Mising Details" })
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "user not found" })
        }
        if (user.resetOtp == "" || user.resetOtp !== otp) {
            return res.json({ success: false, message: "Invalid Otp" })
        }
        if (user.resetOtpExpireAt < Date.now()) {
            return res.json({ success: true, message: "OTP expired" })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = "";
        user.resetOtpExpireAt = 0;
        await user.save();
        return res.json({ success: true, message: "Password changed successfully" })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }

}