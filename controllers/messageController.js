require("mongoose");

const User = require("../models/User");
const Chat = require("../models/Conversation");
const Message = require("../models/Message");

/**
 * Retrieves messages from a specific chat.
 *
 * @param {Object} req - The request object containing the chat ID.
 * @param {Object} res - The response object used to return the fetched messages or an error.
 */
const getMessages = async (req, res) => {
  try {
    const chatId = req.params.id;
    const chat = await Chat.findById(chatId);

    if (chat) {
      const messages = await Message.find({conversation: chat._id,})
          .populate("sender", "-password")
          .sort("-createdAt")
          .limit(12);

      return res.json(messages);
    }
    else{
      throw new Error("Chat does not exists");
    }
  }
  catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

/**
 * Sends a message to a specified recipient.
 *
 * Creates a new chat if it doesn't exist between the sender and recipient.
 * Adds the message to the conversation and updates the last message timestamp.
 *
 * @param {Object} req - The request object containing message content and user information.
 * @param {Object} res - The response object used to confirm message sending or report an error.
 */
const sendMessage = async (req, res) => {
  try {
    const { content, userId } = req.body;

    const recipientId = req.params.id;
    const recipient = await User.findById(recipientId);

    if (recipient) {
      let chat = await Chat.findOne({
                                      recipients: {
                                        $all: [userId, recipientId],
                                      },
                                    });

      if (!chat) {
        chat = await Chat.create({
                                   recipients: [userId, recipientId],
                                 });
      }

      chat.lastMessageAt = Date.now();

      await Message.create({conversation: chat._id, sender: userId, content,});
      chat.save();
      return res.json({ success: true });
    }
    else{
      throw new Error("Receiver does not exist");
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

/**
 * Retrieves chat conversations for a user.
 *
 * Finds all chats that involve the user, populates recipient details,
 * and returns the chat information excluding passwords.
 *
 * @param {Object} req - The request object containing the user ID.
 * @param {Object} res - The response object used to return the chat conversations or an error.
 */
const getChats = async (req, res) => {
  try {
    const { userId } = req.body;
    const chats = await Chat.find({
                                    recipients: {
                                      $in: [userId],
                                    },
                                  })
        .populate("recipients", "-password")
        .sort("-updatedAt")
        .lean();

    for (let i = 0; i < chats.length; i++) {
      const chat = chats[i];
      for (let j = 0; j < 2; j++) {
        if (chat.recipients[j]._id !== userId) {
          chat.recipient = chat.recipients[j];
        }
      }
    }

    return res.json(chats);

  }
  catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  sendMessage,
  getMessages,
  getChats,
};
