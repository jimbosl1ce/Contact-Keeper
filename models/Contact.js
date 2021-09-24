const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
  user: {
    // Here, we associate contact with user...
    type: mongoose.Schema.Types.ObjectId,
    // Here, we refer to the specific collection we're referencing, which is 'users'
    ref: "users",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  type: {
    type: String,
    default: "Personal",
  },
  birthday: {
    type: Date,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("contact", ContactSchema);
