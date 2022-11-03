const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const auth = require("../auth");
const Course = require("../models/Course");

module.exports.checkEmailExists = (reqBody) => {
    return User.find({email : reqBody.email}).then(result => {
        if(result.length > 0){
            return "This login email already registered." 
// "The email is already exist."

        }else{
            return "Register Now!";
        }
    })
}

module.exports.registerUser = (reqBody) => {
    let newUser = new User({
        firstName : reqBody.firstName,
        lastName : reqBody.lastName,
        email : reqBody.email,
        mobileNo : reqBody.mobileNo,
        password : bcrypt.hashSync(reqBody.password, 10)
    })
    return newUser.save().then((user, error) => {
        if(error){
            return "Invalid Registration."; //"Error"
        }else{
            return "Registration Successful!"; //"Congratulation"
        }
    })
}

module.exports.loginUser = (reqBody) => {
    return User.findOne({email : reqBody.email}).then(result => {
        if(result == null){
            return false; // ""

        }else{
            const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password);

            if(isPasswordCorrect){
                return {access : auth.createAccessToken(result) }
            }
        }
    })
}

module.exports.getProfile = (data) => {
    return User.findById(data.userId).then(result => {
        return result;
    })
}

module.exports.getAllUsers = () => {
	return User.find({}).then(result => {
		return result;
	});
}

module.exports.enroll = async (data) => {

    // Adds the courseId in the user's enrollment array
    let isUserUpdated = await User.findById(data.userId).then(user => {
        user.enrollments.push({courseId : data.courseId});

        return user.save().then((user, error) => {
            if(error){
                return false; // "Not Updated"
            }else{
                return true; // "Updated"
            }
        })
    })

    let isCourseUpdated = await Course.findById(data.courseId).then(course => {
        course.enrollees.push({userId : data.userId});

        return course.save().then((course, error) => {
            if(error){
                return false; // "Not Updated"
            }else{
                return true; // "Updated"
            }
        })
    })

    if(isUserUpdated && isCourseUpdated){
        // isUserUpdated and isCourseUpdated = TRUE --> True
        return "You Successfully Enrolled to the Course.";
    }else{
        // if one of these: is false --> FALSE
        // if both get false result --> Concrete FALSE
        return false; 
    }

}

