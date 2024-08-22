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
      res.status(400).json({ msg: "Username or Password missing!" });
    }
    const user = await User.findOne({ userName });
    if (!user) {
      res.status(401).json({ msg: "User does not exist or is not activated!" });
    }
    const passwordCorrect = await user.authenticate(password);

    if (!passwordCorrect) {
      res.status(401).json({ msg: "Incorrect Password" });
    }

    //convert Mongoose document into object for next step (delete password):
    const userObject = user.toObject();
    // delete password before sending user back to frontend!
    delete userObject.password;
    delete userObject.__v;

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
    res.status(200)
      .cookie("KH_Token", jwtToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 3600000 * 4), // expires in 4 hours
      })
      .json({ msg: "login successful!", userObject });
  } catch (err) {
    next(err);
  }
};
