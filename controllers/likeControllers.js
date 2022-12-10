const Post = require("../models/Post");
const PostLike = require("../models/PostLike");
const paginate = require("../util/paginate");

/**
 * Likes a post for a user.
 * Validates if the post exists and checks if the user has already liked the post.
 * If not, it creates a like entry and increments the post's like count.
 *
 * @param {Object} req The request object containing user and post information.
 * @param {Object} res The response object used to return the operation status.
 */
const likePost = async (req, res) => {
    try {
        const { userId } = req.body;

        const postId = req.params.id;
        const post = await Post.findById(postId);

        if (post) {
            const isPostAlreadyLiked = await PostLike.findOne({postId, userId});
            if (!isPostAlreadyLiked) {
                await PostLike.create({
                                          postId,
                                          userId,
                                      });
                post.likeCount = (await PostLike.find({postId})).length;
                await post.save();
                return res.json({success: true});
            } else {
                throw new Error("Post is already liked");
            }
        } else {
            throw new Error("Post does not exist");
        }
    }
    catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

/**
 * Unlikes a post for a user.
 * Validates if the post exists and checks if the user has previously liked the post.
 * If so, it removes the like entry and decrements the post's like count.
 *
 * @param {Object} req The request object containing user and post information.
 * @param {Object} res The response object used to return the operation status.
 */
const unlikePost = async (req, res) => {
    try {
        const { userId } = req.body;

        const postId = req.params.id;
        const post = await Post.findById(postId);

        if (post) {
            const isPostAlreadyLiked = await PostLike.findOne({postId, userId});
            if (isPostAlreadyLiked) {
                await isPostAlreadyLiked.remove();
                post.likeCount = (await PostLike.find({postId})).length;
                await post.save();
                return res.json({success: true});
            } else {
                throw new Error("Post is not liked in the first place");
            }
        } else {
            throw new Error("Post does not exist");
        }
    }
    catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

/**
 * Marks posts as liked by a specific user.
 * Iterates over a list of posts and marks them as liked if the user has liked them.
 *
 * @param {Array} posts The posts to be marked as liked.
 * @param {String} userId The ID of the user to check for likes.
 */
const markAsLiked = async (posts, userId) => {
    let findId = {};
    if (userId){
        findId = { userId };
    }

    const userPostLikes = await PostLike.find(findId); //userId needed

    posts.forEach((post) => {
        userPostLikes.forEach((userPostLike) => {
            if (userPostLike.postId.equals(post._id)) {
                post.liked = true;
                return;
            }
        });
    });
};

/**
 * Fetches posts liked by a specific user.
 * Utilizes pagination to manage the volume of posts returned.
 * Optionally marks each post as liked if viewed by the liker.
 *
 * @param {Object} req The request object containing pagination and user information.
 * @param {Object} res The response object used to return liked posts and count.
 */
const getUserLikedPosts = async (req, res) => {
    try {
        let { page, sortBy } = req.query;
        if (!sortBy) sortBy = "-createdAt";
        if (!page) page = 1;

        const { userId } = req.body;
        const likerId = req.params.id;

        let posts = await PostLike.find({ userId: likerId })
            .sort(sortBy)
            .populate({ path: "postId", populate: { path: "poster" } })
            .lean();

        posts = paginate(posts, 10, page);

        const numberOfPosts = posts.length;
        let responsePosts = [];
        posts.forEach((post) => {
            responsePosts.push(post.postId);
        });
        if (userId) {
            await markAsLiked(responsePosts, userId);
        }

        return res.json({ data: responsePosts, numberOfPosts });

    }
    catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

module.exports = {
    markAsLiked,
    likePost,
    unlikePost,
    getUserLikedPosts,
};