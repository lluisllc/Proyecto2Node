const { Schema, model } = require("mongoose");


const commentsSchema = new Schema({
  comment: String,
  user: [{
    type: Schema.Types.ObjectId, ref: "User"
  }],
  game: [{
    type: Schema.Types.ObjectId, ref: 'Games'
  }],
});

const Comments = model("Comments", commentsSchema);

module.exports = Comments;