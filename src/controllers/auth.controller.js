import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { handleError } from "../utils/handleError.js";

export const register = async (req, res) => {
    try {



        const { email, password, name } = req.body
        const findUser = await User.find({
            where: {
                email: email
            }
        })
        if (findUser) {
            throw new Error('Lo sentimos,el email ya existe')
        }

        if (password.length < 8 || password.length > 20) {
            throw new Error('Password must contain between 6 and 10 characters')
        }


        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validEmail.test(email)) {
            throw new Error('format email invalid')
        }
        const passwordEncrypted = bcrypt.hashSync(password, 5)

        const newUser = await User.create({
            email,
            name,
            password: passwordEncrypted

        })
        return res.status(201).json({
            success: true,
            message: "User registered succesfully",
            data: newUser
        })

    }
    catch (error) {
        if (error.message === 'Lo sentimos,el email ya existe') {
            return handleError(res, error.message, 400)
        }
        if (error.message === 'Password must contain between 6 and 10 characters') {
            return handleError(res, error.message, 400)
        }
        if (error.message === 'format email invalid') {
            return handleError(res, error.message, 400)
        }
        handleError(res, "ERROR", 500)
    }
}

export const login = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password



        if (!email || !password) {
            throw new Error('email and password are mandatories')
        }

        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validEmail.test(email)) {
            throw new Error('Email format is not valid')
        }

        const user = await User.findOne({
            email: email,


        })

        if (!user) {
            throw new Error('Email not found')
        }

        const isValidPassword = bcrypt.compareSync(password, user.password)

        if (!isValidPassword) {
            throw new Error('Password invalid')
        }

        const token = jwt.sign(
            {
                userId: user._id,
                roleName: user.role,
                username: user.name,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            }
        )
        const userLogged = await User.findOne({
            email: email,


        })
        res.status(200).json({
            success: true,
            message: "User logged succesfully",
            token: token,
            data: userLogged.name

        })

    } catch (error) {
        if (error.message === 'email and password are mandatories') {
            return handleError(res, error.message, 400)
        }
        if (error.message === 'Email format is not valid') {
            return handleError(res, error.message, 400)
        }
        if (error.message === 'Email not found') {
            return handleError(res, error.message, 400)
        }
        if (error.message === 'Password invalid') {
            return handleError(res, error.message, 400)
        }
        handleError(res, "ERROR", 500)
    }

}