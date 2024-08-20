import { User } from "../models/UserModel.js";
import { createToken, verifyToken } from "../../utils/token.js";

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

    // to-do: delete password before sending user back to frontend!
    user.password = undefined;
    user.__v = undefined;

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
      .json({ msg: "login successful!", user });
  } catch (err) {
    next(err);
  }
};
