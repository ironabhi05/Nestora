const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require('../utils/wrapAsync.js');
const { listingValiSchema } = require('../Schema.js');
const { isLoggedIn } = require('../Middleware.js')

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
router.get("/new", isLoggedIn, (req, res) => {
    res.render("./listings/New.ejs");
});

//POST
router.post("/", wrapAsync(async (req, res, next) => {
    let newlisting = new Listing(req.body.listing);
    await newlisting.save()
    req.flash("success", "New Listing Added!");
    res.redirect("/listings");
}));

//Show Listing
//Show Route
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews").populate("owner");
    if (!listing) {
        req.flash("error", "Listing Dosen't Exist!");
        res.redirect("/listings");
    };
    res.render("./listings/Show.ejs", { listing });
}));

//Edit Listing
//GET
router.get("/:id/edit", isLoggedIn, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing Dosn't Exist!");
        res.redirect("/listings");
    }
    res.render("./listings/Edit.ejs", { listing });
}));

//PUT =>(UPDATE)
router.put("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
}));

//DELETE Listing
// DELETE
router.delete("/:id", isLoggedIn, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings")
}));


module.exports = router;