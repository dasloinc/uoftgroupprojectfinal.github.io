const express  = require("express");
// const path     = require("path");
const mongoose = require("mongoose");
const PORT     = process.env.PORT || 3001;
const app      = express();

const cookieParser = require('cookie-parser');

// Define middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Send every request to the React app
// Define any API routes before this runs
// app.get("*", function(req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

// Routes
require("./routes/htmlRoutes")(app)
require("./routes/apiRoutes")(app)

const userRouter = require('./routes/User');
app.use('/user', userRouter);
app.use(cookieParser());

// Connect to the Mongo DB
// mongoose.connect(process.env.MONGODB_URI || "mongodb://alphateam:password123@ds029496.mlab.com:29496/heroku_mnws26x7", {
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/togather", {
  useNewUrlParser: true,
  useFindAndModify: false
});
const idConnection = mongoose.connection;
idConnection.on('error', () => console.log("ERROR"));
idConnection.on('open', () => console.log("SUCCESS"));

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on: http://localhost:${PORT}/`);
});
