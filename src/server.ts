import mongoose from "mongoose";
import config from "./config/config";


async function server(){
    try {
        await mongoose.connect(config.database_url as string);
        console.log("✅ Database connected successfully");
        
    } catch (error) {
        console.log(`Server Error: ${error}`);
        
    }

}

export default server;

