const { Schema, model } = require("mongoose");


const commentsSchema = new Schema({
  comment: String,
  user: String,
  game: String,
});

const Comment = model("Comment", commentsSchema);

module.exports = Comment;