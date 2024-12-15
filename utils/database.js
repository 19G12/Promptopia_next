import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    
    mongoose.set("strictQuery", true);
    
    if(isConnected){
        console.log("Database is already connected");
        
        return;
    }
    else {
        try {
           const conn = await mongoose.connect(process.env.MONGOOSE_URL,
           {
            dbName: "Share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true
           })
           isConnected = true;
           console.log("Mongo_db connected");
           
        } catch (error) {
            console.log("Error connecting mongoose: ",error);
            
        }
    }
}