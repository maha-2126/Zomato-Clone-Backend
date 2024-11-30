const  Razorpay = require('razorpay');
var crypto = require("crypto");
const OrdersModel = require('../Model/OrdersModel');

const KEY_ID = 'rzp_test_ll5LeJlltbgJMg';
const SECRET_ID = 'kl28Lt87a5mqstJnanyEQ0jT';

var instance = new Razorpay({ key_id: KEY_ID, key_secret: SECRET_ID });

let _saveNewOrder = async ( data ) => {
      // mongoose way add a single data
      // instance of model
      try {
          var newOrder = new OrdersModel({
              order_id: data.order_id,
              name:data.name,
              mobile: data.mobile,
              email:data.email,
              order_list: data.order_list,
              payment_Id: data.payment_Id,
              payment_Status: data.payment_Status,
              totalAmount: data.totalAmount,
          });
          await newOrder.save();
          return true;
      } catch (error) {
          return false;
      };
  };

module.exports.genOrderId = (request, response) => {
let { amount } = request.body;   
var options = {
    amount: amount * 100,  // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  instance.orders.create(options, function(err, order) {
    if(err){
        response.status(500).send({ status: false});
    } else {
        response.status(200).send({ status: true, order});
    }
  });
}

module.exports.verifyPayment = async (request,response) => {
  let data = request.body;
  let { payment_id, order_id, signature } = data;
  let body = order_id + "|" + payment_id;

 
  var expectedSignature = crypto
  .createHmac('sha256', SECRET_ID)
  .update(body.toString())
  .digest('hex');

  console.log(signature, expectedSignature);
  if (expectedSignature === signature) {
    data["payment_status"] = true;
    await _saveNewOrder()
    response.status(200).send({ 
      status: true,
     });
  } else {
    response.status(200).send({ 
      status: false,
     });
  }

};

// 6e496b56998c087885f79fcbb64592ff77270ebdf5bbcd15be143ed642dd230f
// 6e496b56998c087885f79fcbb64592ff77270ebdf5bbcd15be143ed642dd230f