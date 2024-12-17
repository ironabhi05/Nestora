const express = require("express");
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const User = require('../models/user.js');
const passport = require("passport");

//Signup
router.get("/signup", (req, res) => {
    res.render("./user/Signup.ejs");
});

router.post("/signup", wrapAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.flash("success", "wellcome To Nestora");
        res.redirect("/listings");
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
     passport.authenticate("local", { 
        failureRedirect: "/login", 
        failureFlash: true ,
    }), 
    async (req, res) => {
        req.flash("success","Wellcome back to Nestora. You Are Logged in!");
        res.redirect("/listings");
});


module.exports = router;