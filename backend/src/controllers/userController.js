import { User } from "../models/UserModel.js";



export const register = async (req, res, next) => {
    try {
        const {userName, email, password} = req.body;
        const newUser = await User.create({userName, email, password})
        res.status(200).json({msg: 'registration successful', newUser})
    }catch (err) {
        next(err)
    }
}


export const login = async (req, res, next) => {
    try {
        const {userName, password} = req.body;
       if (!userName || !password) {
        const error = new Error ('Username or Password missing!');
        error.status = 400
        throw error
       }
       const user = await User.findOne({userName});
       if(!user) {
        const error = new Error ('User does not exist or is not activated!');
        error.status = 403;
        throw error
       }
        const passwordCorrect = await user.authenticate(password)
        console.log(passwordCorrect)
        if (!passwordCorrect) {
            const error = new Error('Password incorrect!');
            error.status = 401;
            throw error
        }
        // to-do: delete password before sending user back to frontend!
        user.password = undefined;
        user.__v = undefined;
        res.json({msg: 'login successful!', user})
    }catch(err) {
        next(err)
    }
}