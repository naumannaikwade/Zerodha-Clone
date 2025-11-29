const mongoose = require("mongoose");
const PositionSchema = require("../schemas/PositionSchema");

const Position = mongoose.model("Position", PositionSchema);
module.exports = Position;