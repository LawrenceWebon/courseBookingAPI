const express = require("express");
const router = express.Router();
const Course = require("../models/Course.js");
const courseController = require("../controllers/courseController");
const auth = require ("../auth")

/*
    Activity

    1. Verify the token that should be provided in order to create a user.
    2. In the controller, create a logic inside the addCourse w/c will check if the user that is logged in is admin or not.
        -If the user is admin, continue with the creation of the course
        -else if the user is not admin, return false
    3. Push to gitlab.

*/

router.post("/create", (req, res) => {
    courseController.addCourse(req.body).then(resultFromController => {
        res.send(resultFromController)
    })
})

module.exports = router