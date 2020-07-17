const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema ({
    firstname : {
        type : String,
        required : true,
    },
    lastname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        min : 5,
        max : 50 
    },
    password : {
        type : String,
        required : true
    }
});

//encrypting the password
UserSchema.pre('save', function(next) {
    if(!this.isModified('password'))
        return next()
    bcrypt.hash(this.password, 10, (err,passwordHash) => {
        if(err)
            return next(err);
        this.password = passwordHash;
        next();
    });
});

//making sure thee password is matching
UserSchema.methods.comparePassword = function(password, cb){
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if(err)
            return cb(err);
    //if the password isn't matched
        else{
            if(!isMatch)
                return cb(null, isMatch);
            return cb(null, this);
        }
    });
}

module.exports = mongoose.model('User', UserSchema);