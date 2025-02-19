const mongoose = require("mongoose");
const Review = require("./reviews");
const Schema = mongoose.Schema;

const listingschema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  location: {
    type: String,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  country: {
    type: String,
  },
  image: {
    url: {
      type: String,
    },
    filename: {
      type: String,
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

listingschema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingschema);
module.exports = Listing;
