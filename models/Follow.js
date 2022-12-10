const mongoose = require("mongoose");

/**
 * Schema definition for a follow relationship.
 * Represents the following relationship between two users.
 *
 * @schema FollowSchema
 * @type {mongoose.Schema}
 * @property {ObjectId} userId - The ID of the user who is following.
 * @property {ObjectId} followingId - The ID of the user being followed.
 */
const FollowSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "user",
            required: true,
        },
        followingId: {
            type: mongoose.Types.ObjectId,
            ref: "user",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("follow", FollowSchema);