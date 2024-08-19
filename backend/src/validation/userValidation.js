import { body } from "express-validator";
import { User } from "../models/UserModel.js";

const checkEmailInUse = async(email) => {
    const user = await User.findOne({email});
    if(user){
        const error = new Error('This email is already in use!');
        throw error;
    }
}

const checkUserNameTaken = async(userName) => {
    const user = await User.findOne({userName});
    if (user) {
        const error = new Error('This username is already taken');
        throw error
    }
}

export const registerValidation = [
  body("userName")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Username is a required field!")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Invalid characters for Username!")
    .custom(checkUserNameTaken).withMessage('Username already taken. Try something else!'),
  body("email")
    .trim()
    .escape()
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email address!")
    .notEmpty()
    .withMessage("Email is a required field!")
    .custom(checkEmailInUse).withMessage('Email is already in use!'),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required!")
    .isLength({ min: 5 })
    .withMessage("Password is to short! Minimum length is 5 characters")
]


export const loginValidation = [
    body("userName")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Username is a required field!"),

   body("password")
    .notEmpty()
    .withMessage("Password is required!")

]