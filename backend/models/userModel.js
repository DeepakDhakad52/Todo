import mongoose from "mongoose";

// Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password: {
        type: String,
        required: true,
        select: false
    }
})

const User = new mongoose.model('user', userSchema);

export default User;