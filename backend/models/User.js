const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    select: false,
  },
  image: {
    type: String,
  },
  places: [
    {
      type: Schema.Types.ObjectId,
      ref: "Place",
      required: true,
    },
  ],
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.signJWToken = function () {
  return jwt.sign({ id: this._id }, "asvasvasv13", {
    expiresIn: 86400,
  });
};

module.exports = model("User", UserSchema);