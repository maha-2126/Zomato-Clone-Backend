/**
 * order_id:String
 * name:String
 * mobile:Number
 * email:String
 * orderlist:Array
 * paymentId:String
 * paymentStatus:Boolean
 */

const { Schema, model } = require('mongoose');
const OrdersSchema = new Schema({
    order_id:{ type: String },
    name:{ type: String },
    mobile:{ type: Number },
    email:{ type: String },
    order_list:{ type: Array },
    payment_Id:{ type: String },
    payment_Status:{ type: Boolean },
    totalAmount:{ type: Number },
});

const OrdersModel = model('order',OrdersSchema,'orders');

module.exports = OrdersModel;