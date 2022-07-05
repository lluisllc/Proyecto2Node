const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  favorites: [{
    type: Schema.Types.ObjectId, ref: "Games"
  }],
  // comments: [{
  //   type: Schema.Types.ObjectId, ref: 'Comment'
  // }],
});

const User = model("User", userSchema);

module.exports = User;
