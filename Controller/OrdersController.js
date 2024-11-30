const OrdersModel = require('../Model/OrdersModel');

// module.exports.saveNewOrder = (request,response) => {
//     var newOrder = request.body;
//     response.send({
//         status:true,
//         newOrder,
//     })
// }
module.exports.saveNewOrder = async (request, response) => {
var data = request.body;
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
        });
        await newOrder.save();
        response.status(200).send({
            status: true,
            message: "Order Place Successfully",
        });
    } catch (error) {
        response.status(500).send({
            status:false,
            message: "Invalid Id is passed",
            error: error.message,
        });
    };
};