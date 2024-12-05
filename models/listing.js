const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingschema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    price: {
        type: Number
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },
    image: {
        url: {
            type: String,
            default:"https://lh3.googleusercontent.com/VDPp6VUWdRyP3NjQjIcKUJc8M58XLQBRqNcxAJ8ID0KRRCprBl4G-a1VLg6kdHKDJncxmxPnxZo9QGPuHUvCMBAni2VxQ0EjfSvlvQHE=w1000?s=300",
            set : (v)=>
                v===""
            ?"https://lh3.googleusercontent.com/VDPp6VUWdRyP3NjQjIcKUJc8M58XLQBRqNcxAJ8ID0KRRCprBl4G-a1VLg6kdHKDJncxmxPnxZo9QGPuHUvCMBAni2VxQ0EjfSvlvQHE=w1000?s=300"
            :v
        }},
    });
const Listing = mongoose.model("Listing", listingschema);
module.exports = Listing;