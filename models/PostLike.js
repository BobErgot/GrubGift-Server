const mongoose = require("mongoose");

/**
 * Schema definition for a post like within the application.
 *
 * The PostLike schema records likes made by users on posts. It includes references
 * to both the post that was liked and the user who liked the post. Timestamps are
 * included to track when each like was created, allowing for historical data analysis
 * and providing context for user interactions.
 *
 * @schema PostLike
 * @type {mongoose.Schema}
 * @property {ObjectId} postId - Reference to the post that was liked.
 * @property {ObjectId} userId - Reference to the user who liked the post.
 */
const PostLike = new mongoose.Schema(
    {
        postId: {
            type: mongoose.Types.ObjectId,
            ref: "post",
            required: true,
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "user",
            required: true,
        },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields.
);

module.exports = mongoose.model("postLike", PostLike);