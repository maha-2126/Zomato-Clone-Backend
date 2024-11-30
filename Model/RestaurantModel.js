const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    
name:{type:String},
city:{type:String,required:true},
location_id:{type:Number},
city_id:{type:Number},
locality:{type:String},
thumb:{type:Array},
aggregate_rating:{type:Number},
rating_text:{type:String},
min_price:{type:Number},
contact_number:{type:Number},
cuisine:{type:Array},
image:{type:String},
mealtype_id:{type:Number},
})

const RestaurantModel = mongoose.model('restaurants',RestaurantSchema,'restaurant');

module.exports = RestaurantModel;