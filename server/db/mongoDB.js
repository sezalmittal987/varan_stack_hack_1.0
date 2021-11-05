const mongoose = require("mongoose");

// Build the connection string
const dbURI = process.env.MONGO_URI;
console.log(dbURI);

// Create the database connection
mongoose.connect(
  dbURI,
  { useNewUrlParser: true }
)
.then(conn => {console.log("Connected")})
.catch(console.error);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on("connected", function() {
  console.log("Moongoose Connected");
});

// If the connection throws an error
mongoose.connection.on("error", function(err) {
  console.log("Mongoose default connection error: " + err);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", function() {
  console.log("Mongoose default connection disconnected.");
});