const mongoose = require("mongoose");

/**
 * Schema definition for a conversation within the application.
 *
 * The Conversation schema captures the participants of the conversation (recipients),
 * using their user IDs, and the date of the last message sent in the conversation.
 * It includes timestamps for creation and last update of the conversation itself.
 *
 * This model is utilized to track and manage conversations between users, facilitating
 * the retrieval and display of message history.
 *
 * @schema ConversationSchema
 * @type {mongoose.Schema}
 * @property {Array<ObjectId>} recipients - References to the users involved in the conversation.
 * @property {Date} lastMessageAt - Timestamp of the last message sent in the conversation.
 */
const ConversationSchema = new mongoose.Schema(
    {
        recipients: [
            {
                type: mongoose.Types.ObjectId,
                ref: "user",
            },
        ],
        lastMessageAt: {
            type: Date,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("conversation", ConversationSchema);