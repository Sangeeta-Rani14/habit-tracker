import jwt from"jsonwebtoken"


export const protect = (req, res, next) => {
  console.log("auth working")
    const authHeader = req.headers.authorization;
      
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    const token = authHeader.split(' ')[1]; // This gets the part AFTER the space
    console.log(token)
    console.log("Using Secret:", process.env.JWT_SECRET);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token Data:", decoded); 
        req.user = decoded; 
        next();
    } catch (err) {
      console.log("JWT Verify Error Message:", err.message);
        res.status(401).json({ message: "Token is not valid" });
    }
};