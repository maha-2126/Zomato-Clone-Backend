const { request } = require('express');
const LocationModel = require('../Model/LocationsModel');

module.exports.welcome = (request, response) => {
    response.send("Welcome to api");
};

module.exports.getLocationList = async (request,response) => {
    let result = await LocationModel.find();
    response.send({
        status: true,
        location: result,
    });
};
