const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const auth = require("../auth");

module.exports.checkEmailExists = (reqBody) => {
    return User.find({email : reqBody.email}).then(result => {
        if(result.length > 0){
            return true; // "The email is already exist."

        }else{
            return false;
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
            return false; //"Error"
        }else{
            return true; //"Congratulation"
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