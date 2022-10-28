const mongoose= require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Firstname is Required!"]
    },
    lastname: {
        type: String,
        required: [true, "Lastname is Required!"]
    },
    email: {
        type: String,
        required: [true, "Email is Required!"]
    },
    Password: {
        type: String,
        required: [true, "Password is Required!"]
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    mobileNo:{
        type: String,
        required: [true, "Mobile number is Required!"]
    },
    enrollments: [{
        courseid: {
            type: String,
            required: [true, "Course ID is required!"]
        },
        enrolledOn:{
            type: Date,
            default: new Date()
        },
        status:{
            type: String,
            default: "Enrolled"
        }
    }]


})

module.exports = mongoose.model("User", userSchema);