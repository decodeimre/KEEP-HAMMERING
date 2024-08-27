import 'dotenv/config.js';
import { verifyToken } from './token.js';


export const protectRoute = async (req, res, next) => {

    try {
      const token = req.cookies.KH_Token;
      const isVerified = await verifyToken(token, process.env.SECRET_JWT_KEY);
        console.log('token verified:', isVerified)
      if (!token || !isVerified) {
        return res.status(401).json({ msg: "no valid token found" });
      }
      req.isVerified = isVerified;
      next();
    } catch (error) {
      return res.status(401).json({msg: "Token verification failed"})
    }
  };