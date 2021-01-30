const asyncHandler = require("../util/asyncHandler");
const { validationResult } = require("express-validator");
const Place = require("../models/Place");

const HttpError = require("../models/http-error");

// GET Get place by place id
const getPlaceById = asyncHandler(async (req, res, next) => {
  const placeId = req.params.pid;

  const place = await Place.findById(placeId);

  if (!place) {
    throw new HttpError("Could not find a place for the provided id.", 404);
  }

  return res.json({ place });
});

// GET Get places by user id
const getPlacesByUserId = asyncHandler(async (req, res, next) => {
  const userId = req.params.uid;
  console.log(userId);
  const places = await Place.find({ creator: userId });

  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find places for the provided user id.", 404)
    );
  }

  return res.json({ places });
});

//POST Create place
const createPlace = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description, address, creator } = req.body;

  const place = new Place({
    title,
    description,
    address,
    creator,
  });
  const createdPlace = await place.save();
  return res.status(201).json({ place: createdPlace });
});

//PATCH Update place by id
const updatePlace = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const placeId = req.params.pid;

  const place = await Place.findByIdAndUpdate(placeId, req.body, {
    runValidators: true,
    new: true,
  });

  return res.status(200).json({ place });
});

//DELETE Delete place by id
const deletePlace = asyncHandler(async (req, res, next) => {
  const placeId = req.params.pid;
  await Place.findByIdAndRemove(placeId);
  return res.status(200).json({ message: "Deleted place." });
});

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
