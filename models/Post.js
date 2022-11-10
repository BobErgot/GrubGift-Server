const mongoose = require("mongoose");
const PostLike = require("./PostLike");

const PostSchema = new mongoose.Schema(
    {
        poster: {
            type: mongoose.Types.ObjectId,
            ref: "user",
            required: true,
        },
        title: {
            type: String,
            required: true,
            maxLength: [80, "Title must be no more than 80 characters"],
        },
        content: {
            type: String,
            required: true,
            maxLength: [8000, "Content must be no more than 8000 characters"],
        },
        likeCount: {
            type: Number,
            default: 0,
        },
        commentCount: {
            type: Number,
            default: 0,
        },
        edited: {
            type: Boolean,
            default: false,
        },
        promoted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

PostSchema.pre("remove", async function (next) {
    await PostLike.deleteMany({ postId: this._id });
    next();
});

module.exports = mongoose.model("post", PostSchema);
