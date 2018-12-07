const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const {secretKey,GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,callbackURL,expireTime} = require('./keys.js');
const {User} = require('../models/User');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const jwt = require('jsonwebtoken');
const Router = require('express').Router();

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretKey;
exports.isLogin = passport => {
    passport.use('login-rule', new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then(user => {
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
            .catch(err => console.log(err))

    }))
}
exports.isAdmin = passport => {
    passport.use('admin-rule', new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then(user => {
                if (user.isAdmin) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
            .catch(err => console.log(err))

    }))
}
 
exports.googleStrategy = passport => {
    passport.use(new GoogleStrategy({
        clientID:     GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: callbackURL
      },
      function( accessToken, refreshToken, profile, done) {
        User.findOne({googleId: profile.id}).then(user=>{
            if (user) {
                done(null,user);
            } else {
                new User({
                   name : profile.name.givenName,
                   lastName : profile.name.familyName,
                   email : profile.emails[0].value,
                   googleId : profile._json.id,
                   pic : profile._json.image.url
               }).save().then((user) => {
                    //    const payload = {id : user.id, name : user.name, isAdmin : user.isAdmin};
                    //    jwt.sign(payload,secretKey, {expiresIn : expireTime}, (err,token) => {
                                             
                    //    done(null,token);
                    //    });
                    done(null,user)
                                                            
            });
           } 
      })
    }
    ))
    passport.serializeUser(function(token, done) {
        // console.log(user.id);
        done(null,token.id );
      });
      passport.deserializeUser(function(token, done) {
        // jwt.verify(token, secretKey, function(err, decoded) {
            
        //     if (!err) {
        //         User.findById(decoded.id, function(error, user) {
        //             done(error, user);
        //           });
        //     }
                   
        //   });
        User.findById(id, function(err, user) {
            done(err, user);
          });
        
       });
} 