const mongoose = require("mongoose");
const { isEmail, contains } = require("validator");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: [6, "Username must be at least 6 characters long"],
            maxlength: [30, "Username must be no more than 30 characters long"],
            validate: {
                validator: (val) => !contains(val, " "),
                message: "Username must contain no spaces",
            },
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [isEmail, "Email address must be valid"],
            //select: false, TODO
        },
        password: {
            type: String,
            required: true,
            minLength: [8, "Password must be at least 8 characters long"],
            //select: false, TODO
        },
        biography: {
            type: String,
            default: "",
            maxLength: [250, "Biography must be no more than 250 characters long"],
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            enum: ["Moderator", "User", "Promoter"],
            default: "User",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
