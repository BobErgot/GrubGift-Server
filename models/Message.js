const mongoose = require("mongoose");

/**
 * Schema definition for a message within the application.
 *
 * The Message schema includes fields for the conversation to which the message belongs,
 * the sender of the message (referencing a user), and the content of the message itself.
 * It also includes timestamps for when the message was sent and potentially updated.
 *
 * @schema MessageSchema
 * @type {mongoose.Schema}
 * @property {ObjectId} conversation - Reference to the conversation this message is part of.
 * @property {ObjectId} sender - Reference to the user who sent the message.
 * @property {String} content - The actual text content of the message.
 */
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
