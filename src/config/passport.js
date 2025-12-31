const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const User = require("../models/User");

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
            // Find User
            User.findOne({ email })
                .then((user) => {
                    if (!user)
                        return done(null, false, {
                            message: "The email is not registered",
                        });

                    // Match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;

                        if (!isMatch)
                            return done(null, false, {
                                message: "Incorrect password",
                            });

                        return done(null, user);
                    });
                })
                .catch((error) => done(error));
        })
    );
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};
