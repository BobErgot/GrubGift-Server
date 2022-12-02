const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
    {
        conversation: {
            type: mongoose.Types.ObjectId,
            ref: "conversation",
            required: true,
        },
        sender: {
            type: mongoose.Types.ObjectId,
            ref: "user",
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt timestamps.
);

module.exports = mongoose.model("message", MessageSchema);
