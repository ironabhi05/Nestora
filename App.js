const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Port = 2004;
const Listing = require("./models/listing.js");
const engine = require('ejs-mate');
const methodOverride = require('method-override');
const ExpressError = require('./utils/ExpressError.js');
const listing = require('./Routes/listings.js');
const reviews = require('./routes/reviews.js');


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.engine('ejs', engine);
app.use(express.static(path.join(__dirname, "/public")));




main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Wonderlust');
}

main().then(() => {
    console.log("Connected to MongoDB")
}).catch((err) => {
    console.log("Error connecting to MongoDB")
});

app.use("/listings", listing);
app.use("/listings/:id/reviews", reviews);

app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Hmmm! Can't Reach"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something Went Wrong" } = err;
    res.render("listings/Error.ejs", { message, statusCode });
})