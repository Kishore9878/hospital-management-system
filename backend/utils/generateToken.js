import jwt from "jsonwebtoken";
import "dotenv/config";
export const generateToken = (id) => {
  const token = jwt.sign({ _id: id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};
