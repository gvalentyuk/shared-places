const express = require("express");
const { rules: addPlaceRules } = require("../util/validators/place");
const { rules: updatePlaceRules } = require("../util/validators/updatePlace");
const auth = require("../middleware/auth");
const router = express.Router();

const placesControllers = require("../controllers/places-controllers");

router.route("/:pid").get(placesControllers.getPlaceById);

router.route("/user/:uid").get(placesControllers.getPlacesByUserId);

router.route("/").post(auth, addPlaceRules, placesControllers.createPlace);

router
  .route("/:pid")
  .patch(auth, updatePlaceRules, placesControllers.updatePlace);

router.route("/:pid").delete(auth, placesControllers.deletePlace);

module.exports = router;
