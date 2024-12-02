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
        filename: {
            type: String,
        },
        url: {
            type: String,
            default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fmodern-villa&psig=AOvVaw3G7jyfJanveBcUBhKELx2h&ust=1733206385567000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJCn7Iq3iIoDFQAAAAAdAAAAABAE",
            set : (v)=>
                v===""
            ?"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fmodern-villa&psig=AOvVaw3G7jyfJanveBcUBhKELx2h&ust=1733206385567000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJCn7Iq3iIoDFQAAAAAdAAAAABAE"
            :v
        }},
    });
const Listing = mongoose.model("Listing", listingschema);
module.exports = Listing;