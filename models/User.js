const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({

  // Username
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  // Email
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must use valid email"],
  },

  // Local login users
  password: {
    type: String,
    minlength: 5,
  },

  // GitHub login users
  githubId: {
    type: String,
    sparse: true,
  },
});


// Automatically hash password before saving
userSchema.pre("save", async function () {

  if (
    (this.isNew || this.isModified("password"))
    && this.password
  ) {

    const saltRounds = 10;

    this.password =
      await bcrypt.hash(
        this.password,
        saltRounds
      );
  }
});


// Compare password during login
userSchema.methods.isCorrectPassword =
async function (password) {

  if (!this.password) {
    return false;
  }

  return bcrypt.compare(
    password,
    this.password
  );
};

module.exports =
model("User", userSchema);