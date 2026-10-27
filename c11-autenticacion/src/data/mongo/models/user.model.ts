import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'BD_Mongo: Name is required']
    },
    email: {
        type: String,
        required: [true, 'BD_Mongo: Email is required'],
        unique: [true, 'BD_Mongo: Email must be unique']
    },
    emailValidated: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: [true, 'BD_Mongo: Password is required']
    },
    img: {
        type: String,
    },
    role: {
        type: [String],
        default: ['USER_ROLE'],
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    }
});

export const UserModel = mongoose.model('User', userSchema);
