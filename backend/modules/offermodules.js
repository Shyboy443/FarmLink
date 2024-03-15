const mongoose = require("mongoose");

const offerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },

    

  },
  { timestamps: true }
);
const offer = mongoose.model("offer", offerSchema);

module.exports = offer;
