


export const authenticate = async(req, res, next) => {
    const userInfo = req.isVerified; //attached by protectRoute
    console.log('authenticate userInfo', userInfo);
    res.status(200).json(userInfo)
  }