const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, listingValidate, isOwner } = require("../Middleware.js");
const listingController = require("../controllers/listing.js");

//Index Listing
router
  .route("/")
  .get(wrapAsync(listingController.indexRoute))
  .post(isLoggedIn, wrapAsync(listingController.createPostNewRoute));

//Create Listing
//GET
router.get("/new", isLoggedIn, listingController.createGetNewRoute);

//Show Listing
router
  .route("/:id")
  .get(wrapAsync(listingController.showListingRoute))
  .put(isLoggedIn, isOwner, wrapAsync(listingController.editPutRoute))
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListingRoute));

//Edit Listing
//GET
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editGetRoute)
);

module.exports = router;
