const app = require("express")();
const functions = require("firebase-functions");

//Todos routes
app.use("/", require("./routes/todos"));

exports.api = functions.https.onRequest(app);
