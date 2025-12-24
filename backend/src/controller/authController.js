import User from "../models/user_model.js";
import bcrypt from "bcrypt"
import generateToken from "../utils/genratetoken.js";
export const regiater = async(req,res)=>{
try{
          const {email,name,password}= req.body;
          console.log(email,name,password);

          const salt = await bcrypt.genSalt(10);
          const hashpassword= await bcrypt.hash(password,salt);

          const newUser = new User({
            name:name,
            email:email,
            password:hashpassword,
          })

          await newUser.save();

          return res.status(200).json({
            message:"user created",
                  success: true,

          })

}
catch(err){
    console.log(err);
     res.status(500).json({message:"Internal Server Error"});
}
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user); 

    return res.status(200).json({
      message: "Login successful",
      token,
      success:true,
      user: {
    id: user._id,
    name: user.name, 
    email: user.email
  }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
