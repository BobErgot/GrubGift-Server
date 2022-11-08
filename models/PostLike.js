const mongoose = require("mongoose");

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
