const { check } = require("express-validator");

exports.rules = (() => {
  return [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ];
})();
