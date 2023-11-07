const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const schema = new Schema({
    email: String
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
const myModel = mongoose.model("myCollection", schema);
module.exports = myModel;