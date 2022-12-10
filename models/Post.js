const mongoose = require("mongoose");
const filter = require("../util/filter");
const PostLike = require("./PostLike");

/**
 * Schema definition for a post within the application.
 *
 * The Post schema includes fields for the poster (referencing a user), title and content of the post,
 * like count, comment count, and flags for editing and promoting the post. It enforces maximum length
 * constraints on both the title and content to ensure data consistency. Additionally, it includes
 * timestamps for tracking the creation and last update of each post.
 *
 * Before saving, the title and content are cleaned to remove any inappropriate language. Upon deletion
 * of a post, all associated likes are also removed through a pre-remove hook.
 *
 * @schema PostSchema
 * @type {mongoose.Schema}
 * @property {ObjectId} poster - Reference to the user who created the post.
 * @property {String} title - Title of the post, with a maximum length of 80 characters.
 * @property {String} content - Content of the post, with a maximum length of 8000 characters.
 * @property {Number} likeCount - The number of likes this post has received.
 * @property {Number} commentCount - The number of comments made on this post.
 * @property {Boolean} edited - Flag indicating whether the post has been edited.
 * @property {Boolean} promoted - Flag indicating whether the post has been promoted.
 */
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

/**
 * Pre-save hook to clean the title and content of a post using a predefined filter to remove
 * any inappropriate language.
 */
PostSchema.pre("save", function (next) {
    if (this.title.length > 0) {
        this.title = filter.clean(this.title);
    }

    if (this.content.length > 0) {
        this.content = filter.clean(this.content);
    }

    next();
});

/**
 * Pre-remove hook to delete all likes associated with the post being removed, ensuring data
 * consistency across the application.
 */
PostSchema.pre("remove", async function (next) {
    await PostLike.deleteMany({ postId: this._id });
    next();
});

module.exports = mongoose.model("post", PostSchema);