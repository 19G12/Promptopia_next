import { Schema, model, models } from "mongoose";

const userAuth = new Schema({
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
        default: "/assets/images/default_profile.jpg"
    },
    password: {
        type: String,
        required: true
    }
});

const UserAuth = models?.UserAuth || model("UserAuth", userAuth);

export default UserAuth;