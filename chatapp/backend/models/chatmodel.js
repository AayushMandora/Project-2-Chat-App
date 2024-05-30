const mongoose = require("mongoose");
const { Schema } = mongoose;

const Chatschema = new Schema(
  {
    chatname: { type: String, trim: true },
    groupchat: { type: Boolean, default: false },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latestmessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupadmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", Chatschema);

module.exports = Chat;