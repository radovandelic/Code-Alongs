var User = require("../models/users");
var localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    /*passport.use("login", new localStrategy({
        usernameField: username,
        passwordField: password
    }))*/

    passport.use("login", new localStrategy(function (username, password, done) {
        User.findOne({ username }, (err, user) => {
            if (err) return done(err);
            if (!user) return done(nul, false, { message: "User does not exist" });
            user.comparePasswords(password, function (err, isMatch) {
                if (err) return done(err);
                if (!isMatch) return done(null, false, { message: "Wrong password" });
                return done(null, user);
            })
        })
    }))
};