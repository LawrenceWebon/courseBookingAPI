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


router.post("/create", auth.verify, (req, res) => {
    const data = {
        course: req.body,
        isAdmin: auth.decode(req.headers.authorization).isAdmin
    }

// Create single course
    courseController.addCourse(data).then(resultFromController => {
        res.send(resultFromController)
    })
})

// Get all courses
router.get("/all", (req, res) => {
    courseController.getAllCourses().then(resultFromController => {
        res.send(resultFromController)
    })
})

// Get all active courses
router.get("/active", (req, res) => {
    courseController.getActiveCourses().then(resultFromController => {
        res.send(resultFromController)
    })
})

// Get single course
router.get("/:courseId", (req, res) => {
    courseController.getCourse(req.params.courseId).then(resultFromController => {
        res.send(resultFromController)
    })
})

// Updating a single course
router.patch("/:courseId/update", auth.verify, (req, res) => {
    courseController.updateCourse(req.params.courseId, req.body).then(resultFromController => {
        res.send(resultFromController)
    })
})

// Archiving a single course
router.patch("/:courseId/archive", auth.verify, (req, res) => {
    courseController.archiveCourse(req.params.courseId).then(resultFromController => {
        res.send(resultFromController)
    })
})

module.exports = router