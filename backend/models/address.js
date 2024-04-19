const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobNo: {
      type: Number,
      required: true,
    },
    pinCode: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    town: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;
