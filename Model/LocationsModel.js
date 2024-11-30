// import schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// create schema
const LocationSchema = new Schema({
    name: {type:String},
    city_id:{type:Number},
    location_id:{type:Number},
    city:{type:String},
    country_name:{type:String}
});
// create model
const LocationModel = mongoose.model('locations',LocationSchema,'location')

module.exports = LocationModel;