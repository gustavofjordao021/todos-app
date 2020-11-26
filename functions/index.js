require("dotenv").config();

const app = require("express")();
const cors = require("cors");
const helmet = require("helmet");
const functions = require("firebase-functions");

// CORS setup
app.use(
  cors({
    preflightContinue: true,
    optionsSuccessStatus: 200,
    origin: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "HEAD", "PATCH", "DELETE"],
  })
);

// Middleware Setup
app.use(helmet());

//API routes
app.use("/", require("./routes/todos"));
app.use("/auth", require("./routes/auth"));

exports.api = functions.https.onRequest(app);
