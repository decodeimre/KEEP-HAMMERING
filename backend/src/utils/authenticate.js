export const authenticate = async (req, res, next) => {
  try {
    const userInfo = req.isVerified; //attached by protectRoute
    console.log("authenticate userInfo", userInfo);
    res.status(200).json(userInfo);
  } catch (error) {
    return res.status(500).json({ msg: "Authentication failed" });
  }
};
