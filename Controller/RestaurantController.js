const MenuItemsModel = require('../Model/MenuItemsModel');
const RestaurantModel = require('../Model/RestaurantModel');

const { mongoDbError } = require("../Routes/debugger");

module.exports.getRestaurantListByLocID = async (request,response) => {
    let { loc_id } = request.params;
    try {
    let result = await RestaurantModel.find(
        { location_id: loc_id},
        { locality: 1, name: 1, city: 1, image: 1}
    );
    if (result.length === 0) {
        response.send({
            status:false,
            restaurants: "restaurant is not available for given location",
    });
} else {
    response.send({
    status:true,
    restaurants:result,
    });
}
} catch (error) {
    mongoDbError(error.message);
    response.status(500).send({
        status: false,
        message: "Invalid id is passed",
    });

    
}
};

module.exports.getRestaurantDetailsByID = async (request,response) => {
    let { id } = request.params;
    try {
    let result = await RestaurantModel.findById(id); // find({ _id: id}), findOne({_id : id})
    response.send({
        status:true,
        restaurants:result,
    });
} catch (error) {
    response.status(500).send({
        status:false,
        message: "Invalid Id is passed",
        error: error.message,
    })
}
};

module.exports.filter = async (request,response) => {

    // filter
    // meal type (mandatory)
    // location
    // cuisines
    // cost-for-two (500 (low_cost) to 1000 (high_cost))
    // sort (ASC / DESC)
    // page (1, 2, 3, 4, 5) (per-page - 2 restaurant)
    let { mealtype, location, l_cost, h_cost, sort, cuisine } = request.body;

    sort = sort ? sort : 1;
    // high to low (DESC) and low to hign (ASC)
    const filterData = {};
    
    if(mealtype !== undefined) filterData["mealtype_id"] = mealtype;
    if(location !== undefined) filterData["location_id"] = location;
    // sort
    if(l_cost !== undefined && h_cost !== undefined) 
        filterData["min_price"] = { $gt: l_cost, $lt: h_cost };
    if(cuisine !== undefined) filterData["cuisine_id"] = { $in: cuisine };
    console.log(filterData);

    try {
        let result = await RestaurantModel.find(filterData,{
            name:1,
            city:1,
            locality:1,
            location_id:1,
            min_price:1,
            image:1,
            cuisine_id:1,
            cuisine:1,
        }).sort({
            min_price: sort,
        });
        // high to low (DESC) -1
        // low to high (ASC) 1
        if (result.length === 0) {
            response.send({
                status:false,
                restaurants: "restaurant is not available",
            });
        } else {
        response.send({
        status:true,
        restaurants:result,
        });
    }
    } catch (error) {
        mongoDbError(error.message);
        response.status(500).send({
        status: false,
        message: "Invalid id is passed",
    });
    }
};

// module.exports.getMenuItemsRestByID = async (request, response) => {
//     let { _id } = request.params;
//     try {
//     let result = await MenuItemsModel.find({ restaurant:_id });

//     response.status(200).send({
//         status:true,
//         menu_items: result,
//     })
//     } catch (error) {
//         response.status(500).send({
//             status: false,
//             message: "Error fetching menu items",
//             error: error.message,
//     });
//     }
// }





module.exports.getMenuItems = async (request, response) => {
    let { _id } = request.params;
    try {
        let result = await MenuItemsModel.find({ restaurant:_id });
        response.send({
            status: true,
            menu_items: result,
        });
    } catch (error) {
        response.status(500).send({
            status: false,
            message: "Error fetching menu items",
            error: error.message,
        });
    }
};

module.exports.searchRestaurant = async (request,response) => {
    let { restaurant, loc_id } = request.body;

    let result = await RestaurantModel.find({
        name: { $regex: restaurant + '.*', $options: "i" },
        location_id: Number(loc_id),
    });
    response.send({
        status: true,
        result,
    });
};
