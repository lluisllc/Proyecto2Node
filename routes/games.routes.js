const router = require("express").Router();

const alert = require("alert");
const isLoggedIn = require("../middleware/isLoggedIn");
const Games = require("../models/Games.model");
const User = require("../models/User.model");
const Comment = require("../models/Comments.model");
const Api = require("../services/ApiHandler");
const gamesAPI = new Api()

router.get('/games', isLoggedIn, (req, res) => {
    gamesAPI
        .getGameByPopularity()
        .then((allGames) => {
            res.render(`games/list`, { allGames: allGames.data, user: req.session.user })

        })
        .catch(err => console.log(err));
})

// router.get('/games', (req, res) => {
//     gamesAPI
//         .getAllGames()
//         .then((allGames) => {
//             console.log(req.session.user.username)
//             return User.find(req.user)
//             .then((user) => {
//                 res.render(`games/list`, { allGames: allGames.data , user:user})
//             })
// console.log(allGames.data)
//res.render(`games/list`, { allGames: allGames.data })

//         })
//         .catch(err => console.log(err));
// })


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
    const userNAME = req.user.username
    const comm = req.body.comments
    const idGame = req.body._id
    const idApi = req.body.id
    // console.log(comm, userID, idGame, idApi)
    console.log(userNAME)

    Comment.create({ comment: comm, username: userNAME, user: userID, idApiGame: idApi, game: idGame })
        .then(result => {
            console.log(result)
            res.redirect('/details/' + idApi)
            // res.redirect(`/details/id=${idGame}`)
            // res.redirect(req.get('referer'));
        })
        .catch(err => console.log(err))
})


router.get('/details/:id', (req, res) => {
    const query = { id, title, thumbnail, short_description, game_url, genre, platform, publisher, release_date, comment } = req.body
    const idGame = req.params.id
    // console.log(idGame)
    console.log(req.session.user)

    gamesAPI
        .getGameByID(idGame)
        .then((gameDetails) => {
            return Comment.find({ idApiGame: idGame })
                .then((singleComment) => {
                    res.render(`games/details`, { gameDetails: gameDetails.data, singleComment: singleComment, user: req.session.user })
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
})

// router.post('/details', (req, res) => {
//     const query = { id, title, thumbnail, short_description, game_url, genre, platform, publisher, release_date, comment } = req.body
//     const idGame = req.body.id
//     // console.log(idGame)
//     console.log(req.session.user)

//     gamesAPI
//         .getGameByID(idGame)
//         .then((gameDetails) => {
//             return Comment.find({ idApiGame: idGame })
//                 .then((singleComment) => {
//                     res.render(`games/details`, { gameDetails: gameDetails.data, singleComment: singleComment, user: req.session.user })
//                 })
//                 .catch(err => console.log(err));
//         })
//         .catch(err => console.log(err));
// })

router.post("/edit-comment", isLoggedIn, (req, res) => {
    const query = ({ commentID, comment, username, idAPI } = req.body);
    console.log("QUERY:", req.body);
    if (req.session.user.username === username) {
        Comment.updateOne({ _id: commentID }, { comment: comment })
            .then(() => {
                res.redirect('/details/' + idAPI)
            })
            .catch((err) => console.log(err));
    }
    else { res.redirect('/details/' + idAPI); }
});

router.post("/delete-comment", isLoggedIn, (req, res) => {
    const query = ({ commentID, username, idAPI } = req.body);
    console.log("QUERY:", query);
    if (req.session.user.username === username) {
        Comment.deleteOne({ _id: commentID })
            .then(() => {

                res.redirect('/details/' + idAPI)
            })
            .catch((err) => console.log(err));
    }
    else { res.redirect('/details/' + idAPI) }
});


/**
 * ---arrays
{ field: { $in: [ value1, value2, ..... , valueN ] } }
{ field: { $nin: [ value1, value2, ..... , valueN ] } }
{ field: { $all: [ value1, value2, ..... , valueN ] } }
 */

module.exports = router;
//para borrar