import { User } from "../models/UserModel.js";
import { createToken, verifyToken } from "../utils/token.js";
import nodemailer from "nodemailer";
import { genEmailTemplate } from "../utils/emailTemplate.js";
import 'dotenv/config.js'

// register
export const register = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;

    const newUser = await User.create({ userName, email, password });

    const jwtToken = await createToken(
      {
        userID: newUser._id,
        email: email,
        userName: userName,
      },
      process.env.SECRET_JWT_KEY,
      { expiresIn: "24h" }
    );
  
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.email,
        pass: process.env.password,
      },
    });
    try {
      transporter.verify(function(error, success) {
        if(error) {
          console.log(error)
        }else {
          console.log(('server ready for messages'))
        }
      })
      await transporter.sendMail({
        from: process.env.email,
        to: email,
        subject: "Keep Hammering account activation",
        html: genEmailTemplate(userName, jwtToken, newUser._id),
      });
    }catch(emailError) {
      console.log('Error sending email', emailError);
      return res.status(500).json({ msg: "Failed to send verification email." });
    }

    //convert Mongoose document into object for next step (delete password):
    const userObject = newUser.toObject();
    // delete password before sending user back to frontend!
    delete userObject.password;
    delete userObject.__v;

    res.status(200).json({ msg: "registration successful! check your emails for the activation link!", userObject });
  } catch (error) {
    next(error);
  }
};

// handle verify link

export const handleVerifyLink = async (req, res, next) => {
  try {
    const token = req.params.token;
    const userID = req.params.userID;
    const secretKey = process.env.SECRET_JWT_KEY

    const isVerified = await verifyToken(token, secretKey);
    if (!isVerified) {
      const error = new Error("verification link is not valid!");
      error.status = 404;
      throw error;
    }
    const user = await User.findByIdAndUpdate(userID, { isActivated: true });
    res
      .status(200)
      .json({
        msg: `Hi ${user.userName}! Your account is activated. Please log in!`,
      });
  } catch (error) {
    next(error);
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
      res.status(401).json({ msg: "User does not exist!" });
    }
    if (!user.isActivated) {
      res
        .status(401)
        .json({ msg: "User account not activated. Please check your Emails!" });
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
    res
      .status(200)
      .cookie("KH_Token", jwtToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 3600000 * 4), // expires in 4 hours
      })
      .json({ msg: "login successful!", userObject });
  } catch (err) {
    next(err);
  }
};
