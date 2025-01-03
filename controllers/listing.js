const Listing = require('../models/listing');

//Index Route (All Listings)
module.exports.indexRoute = async (req, res) => {
    let alllisting = await Listing.find({})
    res.render("./listings/Home.ejs", { alllisting })
};

//Create New Listing(GET)
module.exports.createGetNewRoute = (req, res) => {
    res.render("./listings/New.ejs");
};

//Create New Listing(POST)
module.exports.createPostNewRoute = async (req, res, next) => {
    let newlisting = new Listing(req.body.listing);
    newlisting.owner = req.user._id;
    await newlisting.save()
    req.flash("success", "New Listing Added!");
    res.redirect("/listings");
};

//Show Route (Single Listing)
module.exports.showListingRoute = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");
    if (!listing) {
        req.flash("error", "Listing Dosen't Exist!");
        res.redirect("/listings");
    };
    res.render("./listings/Show.ejs", { listing });
};

//Edit Listing Route (GET)
module.exports.editGetRoute = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing Dosn't Exist!");
        res.redirect("/listings");
    }
    res.render("./listings/Edit.ejs", { listing });
};

// Edit Listing Route (PUT)
module.exports.editPutRoute = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

// Delete Listing Route (DELETE)
module.exports.deleteListingRoute = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings")
};