const mongoose = require('mongoose');
require('dotenv').config();

const TABLE = process.env.table || "movie";

const movieSchema = new mongoose.Schema({
  Rank: {type : Number},
  Title: {type : String, required : [true,"Plz provide Title"]},
  Genre: {type: String, required : [true,"Plz provide Genre"], enum: {values:['Action', 'Adventure','Sci-Fi','Horror','Thriller','Comedy','Family','Romance']}},
  Description: {type : String, required : [true,"Plz provide Description"]},
  Director: {type : String, required : [true,"Plz provide Director"]},
  Actors: {type : String, required : [true,"Plz provide Actors"]},
  Year: {type : Number, required : [true,"Plz provide Year"]},
  Runtime: {type : Number, required : [true,"Plz provide Runtime"]},
  Rating: {type : Number, required : [true,"Plz provide Rating"]},
  Votes: {type : Number, required : [true,"Plz provide Votes"]},
  Revenue: {type : Number, required : [true,"Plz provide Revenue"]},
  Metascore: {type : Number, required : [true,"Plz provide Metascore"]},
})

module.exports = mongoose.model(TABLE, movieSchema)