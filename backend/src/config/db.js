import mongooes, { connect } from "mongoose";

const  connectDb = async ()=>{
    try{
        const connect = await mongooes.connect(process.env.MONGODB_URL);
        console.log("Databse connected Successfully");
    }
    catch(err){
        console.log("Database connection failed",err);
        process.exit(1);
    }
}

export default connectDb;