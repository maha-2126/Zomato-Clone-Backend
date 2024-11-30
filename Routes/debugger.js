// Routes/debugger.js
function dbBefore(message) {
    console.log("Before DB Connection: " + message);
}

function dbAfter(message) {
    console.log("After DB Connection: " + message);
}

module.exports = { dbBefore, dbAfter };
