const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const { isLoggedIn, isReviewAuthor } = require("../Middleware.js");
const reviewController = require('../controllers/review.js');


// Post Review
router.post("/",
    isLoggedIn,
    wrapAsync(reviewController.CreateReviewRoute));


//Delete Review
router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.DeleteReviewRoute));

module.exports = router;