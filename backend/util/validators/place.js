const { check } = require("express-validator");

exports.rules = (() => {
  return [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
  ];
})();
