const jwt = require("jsonwebtoken");
const User = require("./User");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token,"Aayush");
      const user = await User.findById(decoded.userId).exec();

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({ message: "Invalid token" });
    }
  } else {
    req.user = undefined;
    next();
  }
};

module.exports = verifyToken;
