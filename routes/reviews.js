const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");
const { isLoggedIn, isReviewAuthor } = require("../Middleware.js")

//Review
// Post Review
// Post Review
router.post("/",
    isLoggedIn,
    wrapAsync(async (req, res) => {
        let listing = await Listing.findById(req.params.id);
        let newReview = new Review(req.body.reviews);
        newReview.author = req.user._id;
        listing.reviews.push(newReview);
        await newReview.save();
        await listing.save();
        req.flash("success", "Review Added!");
        res.redirect(`/listings/${listing._id}`);
    }));


//Delete Review
router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(async (req, res) => {
        let { id, reviewId } = req.params;
        await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
        await Review.findByIdAndDelete(reviewId);
        req.flash("success", "Review Deleted!");
        res.redirect(`/listings/${id}`);
    }));

module.exports = router;