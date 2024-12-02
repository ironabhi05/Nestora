const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingschema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    price: Number,
    image: {
        type: String,
        required: true,
        set: (url) => url === " " ? "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.airbnb.com%2Frooms%2F54072274&psig=AOvVaw0oRGpO-tpHxhD81rOTW-PE&ust=1733155486934000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNDbycH5hooDFQAAAAAdAAAAABAJ" : url,
    },
    location: String,
    country:String,
});
const Listing = mongoose.model("Listing", listingschema);
module.exports = Listing;