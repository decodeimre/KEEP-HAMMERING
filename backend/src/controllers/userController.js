import { User } from "../models/UserModel.js";
import { createToken, verifyToken } from "../utils/token.js";

// register
// needs alot more - verification email etc
export const register = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    const newUser = await User.create({ userName, email, password });
    res.status(200).json({ msg: "registration successful", newUser });
  } catch (err) {
    next(err);
  }
};

// login
export const login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      const error = new Error("Username or Password missing!");
      error.status = 400;
      throw error;
    }
    const user = await User.findOne({ userName });
    if (!user) {
      const error = new Error("User does not exist or is not activated!");
      error.status = 403;
      throw error;
    }
    const passwordCorrect = await user.authenticate(password);

    if (!passwordCorrect) {
      const error = new Error("Password incorrect!");
      error.status = 401;
      throw error;
    }

    //convert Mongoose document into object for next step (delete password):
    const userObject = user.toObject()
    // delete password before sending user back to frontend!
    delete userObject.password 
    delete userObject.__v 

    //create a token
    const jwtToken = await createToken(
      {
        userID: user._id,
        userName: user.userName,
      },
      process.env.SECRET_JWT_KEY,
      { expiresIn: "4h" }
    );

    //attach a cookie, send the token in there
    res
      .cookie("KH_Token", jwtToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 3600000*4), // expires in 4 hours
      })
      .json({ msg: "login successful!", userObject });
  } catch (err) {
    next(err);
  }
};
