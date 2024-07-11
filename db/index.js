const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/virtuerecruite";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(mongoURI, options)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Export the connection
module.exports = mongoose.connection;
