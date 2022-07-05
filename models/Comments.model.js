const { Schema, model } = require("mongoose");


const commentsSchema = new Schema({
  comment: String,
  username: String,
  user: String,
  idApiGame: Number,
  game: String,
});

const Comment = model("Comment", commentsSchema);

module.exports = Comment;