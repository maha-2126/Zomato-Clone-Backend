const express = require("express");
const APIRouter = require('./Routes/APIRouter');
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const { dbAfter, dbBefore } = require("./Routes/debugger");
const app = express();
const PORT = 5003;
// const MONGODB_URI = 'mongodb://localhost:27017/BackEnd';
const MONGODB_URI = 'mongodb+srv://Maha:Maha2126@cluster0.gqpus.mongodb.net/BackEnd';


app.use(cors());// enable cors policy
app.use(morgan("tiny"));
// eligible to access post data
app.use(express.json());// string data to json data
app.use(express.urlencoded({ extended: false })); // post

// add external routing to app js
// middleware
app.use("/", APIRouter);

// before starting server we need to check db connection
dbBefore("connecting to db");
mongoose
    .connect(MONGODB_URI)
    .then(() => {
        dbAfter("DB connected successfully");
        app.listen(PORT, function () {
        console.log("Server is running on port ", PORT);
});
}).catch((error) => {
    console.log("Unable to connect with DB");
    console.log(error);
})