const User = require("../models/User");

const getUser = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username }).select("-password");
    if (user) {
      const posts = await Post.find({poster: user._id})
          .populate("poster")
          .sort("-createdAt");
      let likeCount = 0;
      posts.forEach((post) => {
        likeCount += post.likeCount;
      });
      const data = {
        user,
        posts: {
          count: posts.length,
          likeCount,
          data: posts,
        },
      };
      return res.status(200).json(data);
    } else {
      throw new Error("User does not exist");
    }
  }
  catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId, biography } = req.body;
    const user = await User.findById(userId);
    if (user) {
      if (typeof biography == "string") {
        user.biography = biography;
      }
      await user.save();
      return res.status(200).json({success: true});
    } else {
      throw new Error("User does not exist");
    }
  }
  catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getUser,
  updateUser,
};
