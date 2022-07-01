const { Schema, model } = require("mongoose");


const pendingGamesSchema = new Schema({
    user: [{
        type: Schema.Types.ObjectId, ref: "User"
    }],
    game: [{
        type: Schema.Types.ObjectId, ref: 'Games'
    }],
});

const PendingGames = model("PendingGames", pendingGamesSchema);

module.exports = PendingGames;