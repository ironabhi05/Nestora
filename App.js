const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const Port = 2004;
const engine = require('ejs-mate');
var methodOverride = require('method-override');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.engine('ejs', engine);
app.use(express.static(path.join(__dirname,"/public")));

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Wonderlust');
}

main().then(() => {
    console.log("Connected to MongoDB")
}).catch((err) => {
    console.log("Error connecting to MongoDB")
});

app.listen(Port, () => {
    console.log(`Server is running on port  ${Port}`);
});

app.get("/", (req, res) => {
    res.send("working");
});

//Index Route
app.get("/listings", async (req, res) => {
    let alllisting = await Listing.find({})
    res.render("./listings/Home.ejs", { alllisting })
});

app.get("/listings/new", (req, res) => {
    res.render("./listings/New.ejs");
});

//Show Route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/Show.ejs", { listing });
});

//Create Route
app.post("/listings", async (req, res) => {
    let newlisting = new Listing(req.body.listing);
    await newlisting.save()
    res.redirect("/listings");
});

//Edit Route
app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/Edit.ejs", { listing });
});

//Update Route
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
});

//Delete Post Route
app.delete("/listing/:id", async(req,res)=>{
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings")
});