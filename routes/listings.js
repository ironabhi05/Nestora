const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, listingValidate, isOwner } = require("../Middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../CloudConfig.js");
const upload = multer({ storage });

//Index Listing
router
  .route("/")
  .get(wrapAsync(listingController.indexRoute))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    wrapAsync(listingController.createPostNewRoute)
  );

//Create Listing
//GET
router.get("/new", isLoggedIn, listingController.createGetNewRoute);

//Show Listing
router
  .route("/:id")
  .get(wrapAsync(listingController.showListingRoute))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    wrapAsync(listingController.editPutRoute)
  )
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
