const express = require("express");
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const User = require('../models/user.js');
const passport = require("passport");
const { saveRedirectUrl } = require("../Middleware.js");

//Signup
router.get("/signup", (req, res) => {
    res.render("./user/Signup.ejs");
});

router.post("/signup", wrapAsync(async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ username, email });
        await User.register(newUser, password);
        req.login(newUser, err => {
            if (err) {
                return next(err);
            }
            req.flash("success", "wellcome To Nestora");
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}));

//Login
router.get("/login", (req, res) => {
    res.render("./user/Login.ejs");
});

router.post(
    "/login",
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    async (req, res) => {
        req.flash("success", "Wellcome back to Nestora. You Are Logged in!");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
    });


//Logout
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next();
        }
        req.flash("success", "User Loged Out!");
        res.redirect("/listings");
    })
})

module.exports = router;