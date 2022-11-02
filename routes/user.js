const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const userController = require("../controllers/userController");
const auth = require ("../auth")

// all http method located


router.post("/checkEmail", (req, res) => {
    userController.checkEmailExists(req.body).then(resultFromController => res.send(resultFromController));

})

router.post("/register", (req, res) => {
    userController.registerUser(req.body).then(resultFromController => res.send(resultFromController));
})

router.post("/login", (req, res) => {
    userController.loginUser(req.body).then(resultFromController => res.send(resultFromController));
})


// s38 Act.
router.post("/details", auth.verify, (req, res) => {
    // we can get the token by accessing req.headers.authorization
    const userData = auth.decode(req.headers.authorization)

    userController.getProfile({userId : userData.id}).then(resultFromController => res.send(resultFromController));    
})

router.get("/allUsers", (req, res) => {
	userController.getAllUsers().then(resultFromController => res.send(resultFromController));
})

module.exports = router;