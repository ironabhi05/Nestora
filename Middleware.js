module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) { // Correct usage of isAuthenticated()
        req.flash("error", "You must be logged in to create a listing"); // Fix syntax error in req.flash
        return res.redirect("/login");
    }
    next();
};
