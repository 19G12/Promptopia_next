import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        unique: [true, "Email already exists!"],
        required: [true, "Email is required!"]
    },
    username: {
        type: String,
        required: [true, "Username is required!"],
    },
    image: {
        type: String,
        
    }
});

const User = models?.User || model("User", userSchema);
// The api route is called evertime, because of which new models are created 
//everytime

export default User;