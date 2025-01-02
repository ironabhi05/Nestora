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
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "6776e76fd39840dc7f0dec72" }))
    await Listing.insertMany(initData.data);
    console.log("Data saved..")
};

initDB();