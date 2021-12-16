const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  creatorID: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },

  username: {
    type: String,
    ref: "User",
    required: true,
  },

  startDate: {
    type: Date,
    required: true,
  },

  endDate: {
    type: Date,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  dontMiss: {
    type: String,
    required: true,
  },

  thumbnailPic: {
    type: String,
    required: false,
  },

  blog: {
    type: String,
    required: true,
  },

  time: {
    type: Date,
    default: Date.now,
  },
  imgOne: {
    type: String,
    required: false,
  },
  favOne: {
    type: String,
    required: false,
  },
  favTwo: {
    type: String,
    required: false,
  },
  favThree: {
    type: String,
    required: false,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
