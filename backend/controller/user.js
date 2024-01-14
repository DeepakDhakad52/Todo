import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import User from "../models/userModel.js";
import ErrorHandler from "../middleware/error.js";

export const userRegister = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            next(new ErrorHandler('Please Provide all details...', 400))
        } else {
            let user = await User.findOne({ email });
            if (user) {
                next(new ErrorHandler('User already exist...', 400))
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                user = await User.create({ name, email, password: hashedPassword });
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRETKEY);
                res.status(201).cookie('token', token, {
                    httpOnly: true,
                    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3)
                }).json({
                    success: true,
                    message: 'User Register Successfull...'
                })
            }
        }
    } catch (error) {
        next(error)
    }
}

export const userLogin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email }).select("+password");

        if (!user) {
            next(new ErrorHandler(`User with email : ${email} does not exist...`, 400));
        } else {
            const validPassword = await bcrypt.compare(password, user.password);
            if (validPassword) {
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRETKEY);
                req.user = user;
                if (req.user) {
                    res.status(200).cookie('token', token, {
                        httpOnly: true,
                        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3)
                    }).json({
                        success: true,
                        message: `Login Successfull..., Hi ${user.name}`,
                        token
                    });
                }
            } else {
                next(new ErrorHandler('Invalid email or Password...', 404))
            }
        }
    } catch (error) {
        next(error)
    }
}

export const userLogout = (req, res) => {
    res.status(200).cookie('token', null, {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: 'Logout successfull...'
    });
}

export const getMyDetails = async (req, res, next) => {
    try {
        let { _id } = jwt.verify(req.cookies.token, process.env.JWT_SECRETKEY);
        const user = await User.findById(_id);
        if(!user){
            next('User does not Exist...', 400);
        } else {
            res.status(200).json({
                success: true,
                message: 'User Found',
                user
            })
        }
    } catch (error) {
        next(error)
    }
}