const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('./models/User');
const bcrypt = require('bcrypt');

//here is the request for the token
const cookieExtractor = req => {
    let token = null;
    if(req && req.cookies){
        token = req.cookies["access_token"];
    }
    return token;
}

//AUTHORIZATION - PROTECTING THE END POINTS
//extracting the jwt token from the request - coockieExtractor.
//use to verify to make sure it is good - secretOrKey.
//payload is the data
passport.use(new JwtStrategy({
    jwtFromRequest : cookieExtractor,
    secretOrKey : "to.gather"
}, (payload, done) => {
    User.findById({_id : payload.sub}, (err,user) => {
        if(err)
            return done(err,false);
        if(user)
            return done(null,user);
        else
            //has no err & no user
            return done(null,false)
    });
}));


//WHEN WE ARE LOGGING IN
//here we are authinticating local strategy the user name & password
//done will be a function when we are done.
passport.use(
    new LocalStrategy(
     {
      usernameField: 'user[email]',
      passwordField: 'user[password]',
     },
     (email, password, done) => {
      User.findOne({ email })
       .then(async (user) => {
        const valid = await bcrypt.compare(password, user.password);
        if (!user || !valid) {
         return done(null, false, {
          errors: { 'email or password': 'is invalid' },
         });
        }
        return done(null, user);
       })
       .catch(done);
     }
    )
  );