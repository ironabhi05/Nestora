const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Wonderlust');
}

main().then(() => {
    console.log("Connected to MongoDB")
}).catch((err) => {
    console.log("Error connecting to MongoDB")
});


const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Data saved..")
};

initDB();

// const initDB = async () => {
//     let sampleListing = new Listing({
//         title: "Taj Hotel",
//         description: "This is a sample listing",
//         price: 1000,
//         location: "Lakhimpur Kheri",
//         countery: "India"
//     })
//     await sampleListing.save();
//     console.log("data saved")
// }
// initDB();