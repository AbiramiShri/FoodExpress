const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        name: {type: String, required: true},
        qty: {type: Number, required: true},
        image: {type: String, required: true},
        price: {type: Number, required: true},
        customItem: [
          {
            name: {type: String},
            price: {type: Number},
            type: {type: String},
          },
        ],
        isCustom: {type: Boolean, default: false},
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
      },
    ],
    shippingAddress: {
      name: {type: String, required: true},
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
    },
    paymentMethod: {type: String, required: true},
    shippingPrice: {type: Number, required: true},
    itemsPrice: {type: Number, required: true},
    totalprice: {type: Number, required: true},
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isPaid: {type: Boolean, default: false},
    paidAt: {type: Date},
    isDelivered: {type: Boolean, default: false},
    isPlaced: {type: Boolean, default: true},
    isShipped: {type: Boolean, default: false},
    deliveryDate: {type: Date},
    paymentId: {
      type: String,
    },

    userName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
