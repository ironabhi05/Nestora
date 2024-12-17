const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Port = 2004;
const engine = require('ejs-mate');
const methodOverride = require('method-override');
const ExpressError = require('./utils/ExpressError.js');
const listing = require('./Routes/listings.js');
const reviews = require('./routes/reviews.js');
const user = require('./routes/user.js');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.engine('ejs', engine);
app.use(express.static(path.join(__dirname, "/public")));

const sessionOptions = {
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expire: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    }
};

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Wonderlust');
}

main().then(() => {
    console.log("Connected to MongoDB")
}).catch((err) => {
    console.log("Error connecting to MongoDB")
});

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.use("/listings", listing);
app.use("/listings/:id/reviews", reviews);
app.use("/", user);

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

