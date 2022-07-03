const router = require("express").Router();

const alert = require("alert");
const isLoggedIn = require("../middleware/isLoggedIn");
const Games = require("../models/Games.model");
const User = require("../models/User.model");
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
    console.log(req.body)

    Games.find({ id: idToCheck })
        .then(charArray => {
            // comprobar si ese apiId ya esta en db games
            if (charArray.length === 0) {
                Games
                    .create(query)
                    .then(result => {
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
    const { id } = req.body
    console.log(req.body)
    User.findByIdAndUpdate(req.user._id, { $pull: { favorites: id } })
        .then(() => {
            res.redirect("/profile")
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