const mongoose = require("mongoose");


const roomSchema = mongoose.Schema({
    name: { type: String },
    description: { type: String },
    imageUrl: { type: String },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  });
  
  module.exports = mongoose.model("Room", roomSchema);