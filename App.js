const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const Port = 2004;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Wonderlust');
}

main().then(()=>{
    console.log("Connected to MongoDB")
}).catch((err)=>{
    console.log("Error connecting to MongoDB")
});

app.listen(Port, () => {
    console.log(`Server is running on port  ${Port}`);
});

app.get("/", (req,res) =>{
    res.send("working");
});

// app.get("/testlisting",async(req,res)=>{
//     let sampleListing = new Listing({
//         title: "Taj Hotel",
//         description: "This is a sample listing",
//         price: 1000,
//         image:"",
//         location: "Lakhimpur Kheri",
//         countery: "India"
//     })
//     await sampleListing.save();
//     console.log("Saved");
//     res.send("Sucessfull Testing");
// })