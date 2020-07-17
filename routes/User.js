const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../models/User');


const signToken = userID => {
    return JWT.sign({
        iss : "to.gather",
        sub : userID
    }, "to.gather", {expiresIn : "1h"});
}

userRouter.post('/signup', (req,res) => {
    const { firstname, lastname, email, password } = req.body;
    User.findOne({email}, (err,user) => {
        if(err)
            res.status(500).json({message : {msgBody : "Error has occured", msgError : true}});
        if(user)
            res.status(400).json({message : {msgBody : "email is already taken", msgError : true}});
        else{
            const newUser = new User({firstname, lastname, email, password})
            newUser.save(err => {
                if(err)
                    res.status(500).json({message : {msgBody : "Error has occured", msgError : true}});
                else
                    res.status(201).json({message : {msgBody : "Account successfully created", msgError : false}});
            });
        }
    });
});

userRouter.post('/', (req, res, next) => {
    return passport.authenticate(
     'local',
     { session: false },
     (err, passportUser, info) => {
      if (err) {
       return next(err);
      }
      if (passportUser) {
        const user = passportUser;
        return res.send({ isAuthenticated: true, user });
      }
      return res.status(400).info;
     }
    )(req, res, next);
  });


userRouter.post('/signin', passport.authenticate('local',{session : false}), (req,res) => {
    if (req.isAuthenticated()){
        const {_id,email} = req.user;
        const token = signToken(_id);
        //important that the token wont be stolen
        res.cookie('access_token', token, {httpOnly: true, sameSite: true});
        res.status(200).json({isAuthenticated : true, user : {email}, token: {_id}});
    }  
});

userRouter.get('/logout', passport.authenticate('jwt',{session : false}), (req,res) => {
    res.clearCookie('access_token');
    console.log('from logout')
    res.json({user:{email : "", success : true}});  
});

userRouter.get('/authenticated', passport.authenticate('jwt',{session : false}), (req,res) => {
    const {email} = req.user;
    res.status(200).json({isAuthenticated : true, user : {email}});
});

module.exports = userRouter;
