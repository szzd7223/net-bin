import "dotenv/config";
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const { token } = req.headers["authorization"];

  if (!token) {
    res.json({
      message: "No token provided",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.json({
        message: "Invalid token",
      });
    }

    req.userId = decoded;

    next();
  });
};

export default authMiddleware;
