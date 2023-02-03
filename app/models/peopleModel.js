const mongoose = require('mongoose');
require('dotenv').config();

const TABLE = process.env.table || "prashant";

const peopleSchema = new mongoose.Schema({
  survived: {type : Boolean, default : true},
  name: {type : String, required : [true,"Plz provide name"]},
  sex: {type: String, required : [true,"Plz provide sex"], enum: {values:['male', 'female']}},
  age: {type : Number, required : [true,"Plz provide age"]},
  siblingsOrSpousesAboard: {type : Number},
  parentsOrChildrenAboard: {type : Number},
  fare: {type : Number},
})

module.exports = mongoose.model(TABLE, peopleSchema)