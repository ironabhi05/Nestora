const express = require("express");
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require("passport");
const { saveRedirectUrl } = require("../Middleware.js");
const userController = require('../controllers/user.js');

//Signup
router.route("/signup")
    .get(userController.signupGetRoute)
    .post(wrapAsync(userController.signupPostRoute));

//Login
router.route("/login")
    .get(userController.loginGetRoute)
    .post(
        saveRedirectUrl,
        passport.authenticate("local", {
            failureRedirect: "/login",
            failureFlash: true,
        }),
        userController.loginPostRoute
    );

//Logout
router.get("/logout", userController.logoutGetRoute);

module.exports = router;