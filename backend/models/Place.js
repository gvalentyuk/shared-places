const { Schema, model } = require("mongoose");
const geocoder = require("../util/location");

const PlaceSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    lat: { type: Number },
    lng: { type: Number },
  },
  address: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

PlaceSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);

  this.location = {
    lat: loc[0].latitude,
    lng: loc[0].longitude,
  };

  next();
});

module.exports = model("Place", PlaceSchema);
