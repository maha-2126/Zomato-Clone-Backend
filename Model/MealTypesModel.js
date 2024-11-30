const {Schema, model} = require('mongoose');

const MealTypesSchema = new Schema({
    name:{type:String},
    content:{type:String},
    image:{type:String},
    meal_type:{type:Number}
});

const MealTypesModel = model('mealtypes',MealTypesSchema,'mealtype');

module.exports = MealTypesModel;
// module.exports = model("mealtype", MealTypesSchema);