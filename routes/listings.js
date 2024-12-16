const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require('../utils/wrapAsync.js');
const { listingValiSchema } = require('../Schema.js');
const ExpressError = require('../utils/ExpressError.js');

const listingValidate = (req, res, next) => {
    let { error } = listingValiSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(', ');
        throw new ExpressError(400, errMsg)
    } else {
        next();
    }
};


//Index Listing
router.get("/", wrapAsync(async (req, res) => {
    let alllisting = await Listing.find({})
    res.render("./listings/Home.ejs", { alllisting })
}));

//Create Listing
//GET
router.get("/new", wrapAsync((req, res) => {
    res.render("./listings/New.ejs");
}));

//POST
router.post("/", wrapAsync(async (req, res, next) => {
    let newlisting = new Listing(req.body.listing);
    await newlisting.save()
    res.redirect("/listings");
}));

//Show Listing
//Show Route
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("./listings/Show.ejs", { listing });
}));

//Edit Listing
//GET
router.get("/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/Edit.ejs", { listing });
}));

//PUT =>(UPDATE)
router.put("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
}));

//DELETE Listing
// DELETE
router.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings")
}));


module.exports = router;