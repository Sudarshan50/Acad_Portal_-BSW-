import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const checkAuth = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) {
    console.log("No token found");
    return res.status(401).redirect("http://localhost:3000/"); // Redirect to login if no token is found
  }

  try {
    const decoded = jwt.verify(token, process.env.APP_SECRET); // Replace with your JWT secret
    req.user = decoded;// Attach user data to request
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).redirect("http://localhost:3000/"); // Redirect to login if token has expired
    }
    console.log("Invalid token");
    return res.status(400).send("Invalid token");
  }
};

export default checkAuth;
