import dotenv from "dotenv";
import jwt from "jsonwebtoken";

const checkRole = (role) => {
  return (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      console.log("No token found");
      return res.status(404).send("Session Expired");
    }
    try {
      const decode = jwt.verify(token, process.env.APP_SECRET);
      req.user = decode;
      if (req.user.role != role) {
        return res.status(401).send("Unauthorized");
      }
      next();
    } catch (err) {
      return res.status(404).send("Acess Denied");
    }
  };
};
export default checkRole;
