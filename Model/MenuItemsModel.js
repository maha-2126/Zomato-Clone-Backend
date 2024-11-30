const { Schema, model} = require("mongoose");

const ObjectId = Schema.Types.ObjectId;

const MenuItemsSchema = new Schema({
    
    name:{type:String},
    description:{type:String},
    ingredients:{type:Array},
    restaurantId:{type:ObjectId},
    image:{type:String},
    qty:{type:Number},
    price:{type:Number}
});

const MenuItemsModel = model('menuitems',MenuItemsSchema,'menuitem');

module.exports = MenuItemsModel;