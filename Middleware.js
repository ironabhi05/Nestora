const { session } = require("passport");
const { listingValiSchema } = require('./Schema.js');
const Listing = require("./models/listing.js");
const Review = require("./models/reviews.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create a listing");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.listingValidate = (req, res, next) => {
    let { error } = listingValiSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(', ');
        throw new ExpressError(400, errMsg)
    } else {
        next();
    }
};

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You Don't have Permission To Edit...!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the Author of this Review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};