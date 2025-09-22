const mongoose = require("mongoose");
const UsersSchema = require("../schemas/UsersSchema");

const UserModel = mongoose.model("User", UsersSchema);

module.exports = UserModel;
