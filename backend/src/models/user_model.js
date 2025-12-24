import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        require:true,
        type:String,
    },
    password:{
        require:true,
        type:String,
    },
    email:{
       require:true,
        type:String,
    }
},
{
    timestamps:true,
}
)

const User =mongoose.model("User",userSchema)

export default User;
