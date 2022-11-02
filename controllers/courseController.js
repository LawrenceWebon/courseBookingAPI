const Course = require("../models/Course")

module.exports.addCourse = (reqBody) => {
    let newCourse = new Course ({
        name: reqBody.name,
        description: reqBody.description,
        price: reqBody.price
    })

    return newCourse.save().then((newCourse, error) => {
        if(error){
            return false
        }
        return "You added a new course!"
    })
}