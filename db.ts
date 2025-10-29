import mongoose from "mongoose";

const connect = async () => {
try{
    await mongoose.connect(process.env.MONGO_URL!)
  
}
catch(error){
    throw new Error("Could not connect to database: " + error)
}

};

export default connect;

