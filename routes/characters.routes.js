const router = require("express").Router();

const alert = require("alert");
const isLoggedIn = require("../middleware/isLoggedIn");
const Games = require("../models/Games.model");
const User = require("../models/User.model");
const Comment = require("../models/Comments.model");
const Api = require("../services/ApiHandler");
const gamesAPI = new Api()

router.get('/games', (req, res) => {
    gamesAPI
        .getAllGames()
        .then((allGames) => {
            // console.log(allGames.data)
            res.render(`games/list`, { allGames: allGames.data })

        })
        .catch(err => console.log(err));
})

router.post("/add-favorite", isLoggedIn, (req, res) => {
    const query = { id, title, thumbnail, short_description, game_url, genre, platform, publisher, release_date } = req.body
    const idToCheck = req.body.id;
    // console.log(req.body)

    Games.find({ id: idToCheck })
        .then(charArray => {
            // comprobar si ese apiId ya esta en db games
            console.log(charArray)
            if (charArray.length === 0) {
                Games
                    .create(query)
                    .then(result => {
                        console.log(result)
                        User
                            .findByIdAndUpdate(req.user._id, { $push: { favorites: result._id } })
                            .then(() => {
                                res.redirect("/games")
                            })
                    })
                    .catch(err => console.log(err))
            } else {
                User
                    .findById(req.user._id)
                    .then((user) => {
                        if (!user.favorites.includes(charArray[0]._id)) {
                            User
                                .findByIdAndUpdate(req.user._id, { $push: { favorites: charArray[0]._id } })
                                .then(() => {
                                    res.redirect("/games")
                                })
                        } else { res.redirect("/games") }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        })
})


router.post("/delete-favorite", isLoggedIn, (req, res) => {
    const { _id } = req.body
    console.log(req.body)
    console.log('user:', req.user._id)
    User.findByIdAndUpdate(req.user._id, { $pull: { favorites: _id } })
        .then(() => {

            res.redirect("/profile")
        })
        .catch(err => console.log(err));

})

router.post("/add-comment", isLoggedIn, (req, res) => {
    const userID = req.user._id
    const comm = req.body.comments
    const idGame = req.body._id
    const idApi = req.body.id
    // console.log(comm, userID, idGame, idApi)
    console.log(idApi)

    Comment.create({ comment: comm, user: userID, idApiGame: idApi, game: idGame })
        .then(result => {
            console.log(result)
            // res.redirect(`/details/id=${idGame}`)
            res.redirect('/profile')
        })
        .catch(err => console.log(err))
}
)

router.post('/details', (req, res) => {
    const query = { id, title, thumbnail, short_description, game_url, genre, platform, publisher, release_date, comment } = req.body
    const idGame = req.body.id
    console.log(idGame)

    gamesAPI
        .getGameByID(idGame)
        .then((gameDetails) => {

            return Comment.find({ idApiGame: idGame })
                .then((singleComment) => {
                    res.render(`games/details`, { gameDetails: gameDetails.data, singleComment: singleComment })
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
})



/**
 * ---arrays
{ field: { $in: [ value1, value2, ..... , valueN ] } }
{ field: { $nin: [ value1, value2, ..... , valueN ] } }
{ field: { $all: [ value1, value2, ..... , valueN ] } }
 */

module.exports = router;
//para borrar