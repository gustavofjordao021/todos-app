require("dotenv").config();

const app = require("express")();
const functions = require("firebase-functions");

//API routes
app.use("/", require("./routes/todos"));
app.use("/auth", require("./routes/auth"));

exports.api = functions.https.onRequest(app);
