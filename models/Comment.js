const mongoose = require("mongoose");
const Post = require("./Post");
const filter = require("../util/filter");


/**
 * Schema definition for a comment within the application.
 *
 * The Comment schema includes fields for the commenter (referencing a user),
 * the post the comment is associated with (referencing a post), content of the comment,
 * parent comment (if it's a reply), children comments (if any), and a flag indicating
 * if the comment has been edited. It also includes timestamps for creation and last update.
 *
 * @schema CommentSchema
 * @type {mongoose.Schema}
 * @property {ObjectId} commenter - Reference to the user who made the comment.
 * @property {ObjectId} post - Reference to the post on which the comment is made.
 * @property {String} content - The content of the comment.
 * @property {ObjectId} parent - Reference to a parent comment (for nested comments).
 * @property {Array<ObjectId>} children - References to child comments (for nested comments).
 * @property {Boolean} edited - Flag indicating whether the comment has been edited.
 *
 * The schema defines a post-remove hook to delete all child comments when a comment is removed,
 * and a pre-save hook to clean the content of the comment using a predefined filter.
 */
const CommentSchema = new mongoose.Schema(
    {
        commenter: {
            type: mongoose.Types.ObjectId,
            ref: "user",
            required: true,
        },
        post: {
            type: mongoose.Types.ObjectId,
            ref: "post",
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        parent: {
            type: mongoose.Types.ObjectId,
            ref: "comment",
        },
        children: [
            {
                type: mongoose.Types.ObjectId,
                ref: "comment",
            },
        ],
        edited: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

/**
 * Middleware to handle cascading delete of comments.
 * If a comment is removed, all child comments are also recursively removed.
 */
CommentSchema.post("remove", async function (res, next) {
    const comments = await this.model("comment").find({ parent: this._id });

    for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];
        await comment.remove();
    }

    next();
});

/**
 * Middleware to cleanse any bad words in comment content before saving.
 * Applies the filter utility to sanitize the content.
 */
CommentSchema.pre("save", function (next) {
    if (this.content.length > 0) {
        this.content = filter.clean(this.content);
    }

    next();
});

const Comment = mongoose.model("comment", CommentSchema);

module.exports = Comment;