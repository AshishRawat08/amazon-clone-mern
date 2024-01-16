const jwt = require("jsonwebtoken");
const USER = require("../models/userSchema");
const secretKey = process.env.KEY;

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.Amazonweb;

    const verifyToken = jwt.verify(token, secretKey);
    console.log(verifyToken);

    const routeUser = await USER.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    console.log(routeUser);

    if (!routeUser) {
      throw new Error("user not found");
    }

    req.token = token;
    req.routeUser = routeUser;
    req.userID = routeUser._id;

    next();
  } catch (error) {
    res.status(401).send("unautherized user : no token provide");
    console.log(error);
  }
};

module.exports = authenticate;
