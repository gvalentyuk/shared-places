const express = require("express");
const { rules: addPlaceRules } = require("../util/validators/place");
const { rules: updatePlaceRules } = require("../util/validators/updatePlace");
const router = express.Router();

const placesControllers = require("../controllers/places-controllers");

router.route("/:pid").get(placesControllers.getPlaceById);

router.route("/user/:uid").get(placesControllers.getPlacesByUserId);

router.route("/").post(addPlaceRules, placesControllers.createPlace);

router.route("/:pid").patch(updatePlaceRules, placesControllers.updatePlace);

router.delete("/:pid", placesControllers.deletePlace);

module.exports = router;
