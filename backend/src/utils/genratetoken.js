import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,  // corrected key name
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

export default generateToken;
