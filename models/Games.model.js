const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const gamesSchema = new Schema(
  {
    id: Number,
    title: String,
    thumbnail: String,
    short_description: String,
    game_url: String,
    genre: String,
    platform: String,
    release_date: String,
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
    // publisher: String,
    // developer: String,
    // release_date: String,
    // freetogame_profile_url: String,
  },
  {
    timestamps: true,
  }
);


// gamesSchema.pre("save", function (next) {
//   // console.log(this)

//   const nameToUpper = this.name.split(' ').map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ')

//   this.name = nameToUpper

//   next();
// });


// const Games = model("Games", gamesSchema);

module.exports = model("Games", gamesSchema);
