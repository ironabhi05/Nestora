const User = require('../models/user.js');


//Get Signup
module.exports.signupGetRoute = (req, res) => {
    res.render("./user/Signup.ejs");
};

//Post Signup
module.exports.signupPostRoute = async (req, res, next) => {
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
};

//Get Login 
module.exports.loginGetRoute = (req, res) => {
    res.render("./user/Login.ejs");
};

//Post Login
module.exports.loginPostRoute = async (req, res) => {
    req.flash("success", "Wellcome back to Nestora. You Are Logged in!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

//Get Logout 
module.exports.logoutGetRoute = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next();
        }
        req.flash("success", "User Loged Out!");
        res.redirect("/listings");
    })
};